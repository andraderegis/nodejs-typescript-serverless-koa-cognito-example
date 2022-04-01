import Router from 'koa-router';

import {
  confirmPassword,
  context,
  forgotPassword,
  getCurrentUserData,
  ping,
  signIn,
  signUp,
  token,
  verify
} from './controllers';

const appRouter = new Router();

appRouter.post('/auth/confirm-password', confirmPassword);
appRouter.post('/auth/forgot-password', forgotPassword);
appRouter.post('/auth/signin', signIn);
appRouter.post('/auth/signup', signUp);
appRouter.post('/auth/verify', verify);
appRouter.get('/context', context);
appRouter.get('/users/:id', getCurrentUserData);
appRouter.get('/ping', ping);
appRouter.get('/token', token);

export default appRouter;
