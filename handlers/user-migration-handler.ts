import {
  UserMigrationAuthenticationTriggerEvent,
  UserMigrationForgotPasswordTriggerEvent
} from 'aws-lambda';

import { UsersRespository } from '../infra/repositories/UsersRepository';
import { UserServices } from '../services/UserServices';
import { UserMigrationHandlerInput } from './types/UserMigrationTypes';

import { userMigrationAuthenticationHandler } from './user-migration-authentication-handler';
import { userMigrationForgotPasswordHandler } from './user-migration-forgot-password-handler';

const migrationStrategies = new Map<String, Function>([
  ['UserMigration_Authentication', userMigrationAuthenticationHandler],
  ['UserMigration_ForgotPassword', userMigrationForgotPasswordHandler]
]);

export const migration = (
  event: UserMigrationAuthenticationTriggerEvent | UserMigrationForgotPasswordTriggerEvent
) => {
  const handler = migrationStrategies.get(event.triggerSource);

  console.log('event.triggerSource:', event.triggerSource);

  if (!handler) {
    throw new Error('Bad triggerSource ' + event.triggerSource);
  }

  const userServices = new UserServices(new UsersRespository());

  return handler({
    event,
    userServices
  } as UserMigrationHandlerInput);
};
