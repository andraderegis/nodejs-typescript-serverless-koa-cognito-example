import Koa, { Context, Next } from 'koa';
import koaJson from 'koa-json';
import koaBody from 'koa-body';
import appRouter from './routes';

const app = new Koa();
const handlerErrors = async (ctx: Context, next: Next) => {
  try {
    console.log({ URL: ctx.request.URL });
    await next();
  } catch (error) {
    console.log({ error });
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message
    };
  }
};

app
  .use(handlerErrors)
  .use(koaJson())
  .use(koaBody())
  .use(appRouter.routes())
  .use(appRouter.allowedMethods());

export default app;
