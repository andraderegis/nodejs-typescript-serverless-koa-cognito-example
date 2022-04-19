export type AWSCognitoSettings = {
  apiVersion: string;
  region: string;
  clientId: string;
  secretHash: string;
  userPoolId: string;
};

export type SignUpParams = {
  username: string;
  password: string;
  userAttrs: Array<any>;
};

export type SignInParams = {
  username: string;
  password: string;
};

export type SignOutParams = {
  accessToken: string;
};

export type ConfirmSignUpParams = {
  username: string;
  code: string;
};

export type ForgotPasswordParams = {
  username: string;
};

export type ConfirmNewPasswordParams = {
  username: string;
  password: string;
  code: string;
};
