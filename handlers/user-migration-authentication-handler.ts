import { UserMigrationHandlerInput } from './types/UserMigrationTypes';

export const userMigrationAuthenticationHandler = async ({
  event,
  userServices
}: UserMigrationHandlerInput) => {
  const user = await userServices.authenticate(event.userName, event.request.password);

  event.response.userAttributes = {
    email: user.email,
    email_verified: 'true',
    username: user.username
  };

  event.response.finalUserStatus = 'CONFIRMED';
  event.response.messageAction = 'SUPPRESS';

  const cloneEvent = Object.assign({}, event);
  delete cloneEvent.request.password;

  console.log({ event: JSON.stringify(cloneEvent) });

  return event;
};
