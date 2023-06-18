import { ResponseBuilder } from '@core/utils/response-builder';
import Router from '@koa/router';
import { AppState } from '@models/app.state';
import { APIEnum } from '@models/enums/api.category.enum';
import { ParameterizedContext } from 'koa';
import { Context } from 'vm';

const HealthRoute = new Router();

// Get list user
HealthRoute.get(
  APIEnum.HEALTH_API,
  async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
    const data = 'I am healthy';
    ctx.body = new ResponseBuilder(data).build();
  },
);

export { HealthRoute };