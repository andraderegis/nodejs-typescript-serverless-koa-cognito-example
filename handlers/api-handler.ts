import 'dotenv/config';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';

import app from '../infra/app';

let serverlessExpressInstance: any;

export const server = async (event: APIGatewayEvent, context: Context) => {
  if (!serverlessExpressInstance) {
    serverlessExpressInstance = serverlessExpress({ app: app as any });
  }

  return serverlessExpressInstance(event, context);
};
