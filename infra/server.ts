import axios from 'axios';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import koaJson from 'koa-json';
import koaBody from 'koa-body';

const app = new Koa();
const appRouter = new Router();

appRouter.get('/context', async (ctx: Context) => {
  console.log({ ctx });

  ctx.status = 200;
  ctx.body = { ctx };
});

app.use(koaJson()).use(koaBody()).use(appRouter.routes()).use(appRouter.allowedMethods());

export default app;
