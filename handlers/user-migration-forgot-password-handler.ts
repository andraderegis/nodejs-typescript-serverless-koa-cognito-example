import { UserMigrationHandlerInput } from './types/UserMigrationTypes';

export const userMigrationForgotPasswordHandler = async ({
  event,
  userServices
}: UserMigrationHandlerInput) => {
  const user = await userServices.findByUsername(event.userName);

  console.log({ user });

  if (!user) {
    throw new Error('User not exists');
  }

  event.response.userAttributes = {
    email: user.email,
    email_verified: 'true',
    username: user.username
  };

  event.response.messageAction = 'SUPPRESS';

  console.log({ event });

  return event;
};
