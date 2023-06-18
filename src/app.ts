import 'reflect-metadata';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa, { Context } from 'koa';
import Router from '@koa/router';
import { HealthRoute } from '@controllers/health/health.controller';
import { useContainer } from 'typeorm';
import Container from 'typedi';
import { AppState } from '@models/app.state';
import { config } from '@config/app';
import { loggerMiddleware } from './core/middleware/logger.middleware';
import { errorHandlerMiddleware } from './core/middleware/error-handler.middleware';
import { GiftCodeRoute } from '@controllers/verify/giftcode.controller';

useContainer(Container);
const app = new Koa<AppState, Context>();

app.use(cors());
app.use(
  bodyParser({
    enableTypes: ['json'],
    jsonLimit: config.app.jsonLimit,
  }),
);
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);

const router = new Router();

const webRoutes = [HealthRoute, GiftCodeRoute];
router.use(HealthRoute.routes());

router.use(`${config.app.api_prefix}/web`, ...webRoutes.map((e) => e.routes()));

app.use(router.routes()).use(router.allowedMethods());
if (process.env.NODE_ENV != 'development') {
  console.info = function () {};
  console.warn = function () {};
  console.log = function () {};
}
export default app;
