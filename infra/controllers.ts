import { Context } from 'koa';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { CognitoSettings } from '../config/cognito';
import { CognitoService } from '../services';

const cognitoService = new CognitoService(CognitoSettings);

export const context = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = { ctx };
};

export const token = async (ctx: Context) => {
  let token = {};

  const authorization = ctx.request.headers['authorization'];

  if (authorization) {
    [, token] = authorization.split(' ');
  }

  ctx.status = 200;
  ctx.body = {
    token
  };
};

export const getCurrentUserData = async (ctx: Context) => {
  let token = '';

  const authorization = ctx.request.headers['authorization'];

  if (!authorization) {
    ctx.status = 400;
    return;
  }

  [, token] = authorization.split(' ');

  const id = ctx.params.id;
  const decodedToken = jwt.decode(token) as JwtPayload;

  if (decodedToken.sub !== id) {
    ctx.status = 403;
    return;
  }

  ctx.status = 200;
  ctx.body = {
    id,
    data: {
      id: decodedToken.sub,
      username: decodedToken.username
    }
  };
};

export const signUp = async (ctx: Context) => {
  const { username, password, email } = ctx.request.body;

  const userAttrs = [
    {
      Name: 'email',
      Value: email
    }
  ];

  const result = await cognitoService.signUpUser({
    username,
    password,
    userAttrs
  });

  ctx.status = result ? 201 : 400;
};

export const signIn = async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body;

    const result = await cognitoService.signInUser({
      username,
      password
    });

    ctx.status = 200;
    ctx.body = response(200, { ...result });
  } catch (error) {
    ctx.status = 400;
    ctx.body = response(400, null, error);
  }
};

export const verify = async (ctx: Context) => {
  const { username, code } = ctx.request.body;

  const result = await cognitoService.confirmSignUp({
    username,
    code
  });

  ctx.status = result ? 200 : 400;
};

export const confirmPassword = async (ctx: Context) => {
  const { username, password, code } = ctx.request.body;

  const result = await cognitoService.confirmNewPassword({
    username,
    password,
    code
  });

  ctx.status = result ? 200 : 400;
};

export const forgotPassword = async (ctx: Context) => {
  const { username } = ctx.request.body;

  const result = await cognitoService.forgotPassword({
    username
  });

  ctx.status = result ? 200 : 400;
};

export const ping = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = response(200, { date: new Date(), message: 'ping' });
};

const response = (status: number, data: any, error?: Error): any => {
  return error
    ? {
        status,
        data,
        error
      }
    : {
        status,
        data
      };
};
