import {
  Callback,
  Context,
  UserMigrationAuthenticationTriggerEvent,
  UserMigrationForgotPasswordTriggerEvent
} from 'aws-lambda';

import { UserServices } from '../../services/UserServices';

export type UserMigrationHandlerInput = {
  callback?: Callback;
  context?: Context;
  event: UserMigrationAuthenticationTriggerEvent | UserMigrationForgotPasswordTriggerEvent;
  userServices: UserServices;
};
