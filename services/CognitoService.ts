import AWS from 'aws-sdk';
import crypto from 'crypto';

import { AWSCognitoAuthFlow } from './enum';
import {
  AWSCognitoSettings,
  ConfirmNewPasswordParams,
  ConfirmSignUpParams,
  ForgotPasswordParams,
  SignInParams,
  SignUpParams
} from './types';

export class CognitoService {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
  private clientId: string;
  private secretHash: string;

  constructor(awsCognitoSettings: AWSCognitoSettings) {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(awsCognitoSettings);
    this.clientId = awsCognitoSettings.clientId;
    this.secretHash = awsCognitoSettings.secretHash;
  }

  public async signUpUser({ password, username, userAttrs }: SignUpParams): Promise<boolean> {
    try {
      const data = await this.cognitoIdentity
        .signUp({
          ClientId: this.clientId,
          Password: password,
          Username: username,
          SecretHash: this.hashSecret(username),
          UserAttributes: userAttrs
        })
        .promise();

      console.log(data);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  public async signInUser({ password, username }: SignInParams): Promise<any> {
    const { AuthenticationResult } = await this.cognitoIdentity
      .initiateAuth({
        AuthFlow: AWSCognitoAuthFlow.UserPasswordAuth,
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this.hashSecret(username)
        }
      })
      .promise();

    return AuthenticationResult;
  }

  public async confirmSignUp({ code, username }: ConfirmSignUpParams): Promise<boolean> {
    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp({
          ClientId: this.clientId,
          ConfirmationCode: code,
          Username: username,
          SecretHash: this.hashSecret(username)
        })
        .promise();

      console.log(cognitoResp);

      return true;
    } catch (error) {
      console.log('error', error);

      return false;
    }
  }

  public async forgotPassword({ username }: ForgotPasswordParams): Promise<boolean> {
    try {
      const data = await this.cognitoIdentity
        .forgotPassword({
          ClientId: this.clientId,
          Username: username,
          SecretHash: this.hashSecret(username)
        })
        .promise();

      console.log(data);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  public async confirmNewPassword({
    code,
    password,
    username
  }: ConfirmNewPasswordParams): Promise<boolean> {
    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword({
          ClientId: this.clientId,
          ConfirmationCode: code,
          Password: password,
          Username: username,
          SecretHash: this.hashSecret(username)
        })
        .promise();

      console.log(data);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  private hashSecret(username: string): string {
    return crypto
      .createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64');
  }
}
