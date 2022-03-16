import axios from 'axios';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import koaJson from 'koa-json';
import koaBody from 'koa-body';

import { CognitoSettings } from '../config/cognito';
import { CognitoService } from '../services';

const app = new Koa();
const appRouter = new Router();
const cognitoService = new CognitoService(CognitoSettings);

const context = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = { ctx };
};

const signUp = async (ctx: Context) => {
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

const signIn = async (ctx: Context) => {
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

const verify = async (ctx: Context) => {
  const { username, code } = ctx.request.body;

  const result = await cognitoService.confirmSignUp({
    username,
    code
  });

  ctx.status = result ? 200 : 400;
};

const confirmPassword = async (ctx: Context) => {
  const { username, password, code } = ctx.request.body;

  const result = await cognitoService.confirmNewPassword({
    username,
    password,
    code
  });

  ctx.status = result ? 200 : 400;
};

const forgotPassword = async (ctx: Context) => {
  const { username } = ctx.request.body;

  const result = await cognitoService.forgotPassword({
    username
  });

  ctx.status = result ? 200 : 400;
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

appRouter.get('/context', context);

appRouter.post('/auth/confirm-password', confirmPassword);
appRouter.post('/auth/forgot-password', forgotPassword);
appRouter.post('/auth/signin', signIn);
appRouter.post('/auth/signup', signUp);
appRouter.post('/auth/verify', verify);

app.use(koaJson()).use(koaBody()).use(appRouter.routes()).use(appRouter.allowedMethods());

export default app;
