import { AWSCognitoSettings } from '../../services/types';

export const CognitoSettings: AWSCognitoSettings = {
  apiVersion: process.env.AWS_COGNITO_API_VERSION,
  region: process.env.AWS_COGNITO_REGION,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
  secretHash: process.env.AWS_COGNITO_USER_SECRET_HASH
};
