import { ResponseBuilder } from '@core/utils/response-builder';
import Router from '@koa/router';
import { AppState } from '@models/app.state';
import { APIEnum } from '@models/enums/api.category.enum';
import { ParameterizedContext } from 'koa';
import { Context } from 'vm';
// import { UserRequired } from '@core/middleware/auth.middleware';
import { validateMiddleware } from '@core/middleware/validate.middleware';

import dotenv from 'dotenv';
import Container from 'typedi';
import { GiftCodeService } from '@src/service/giftcode';
import { GiftCodeModel } from '@models/giftcode/add-giftcode';

dotenv.config();

const GiftCodeRoute = new Router({
  prefix: '/giftcode',
});

GiftCodeRoute.post(
  APIEnum.ADD_GIFTCODE,
  //   UserRequired,
  validateMiddleware({
    body: GiftCodeModel,
  }),
  async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
    const { giftcode, wallet, discordName } = ctx.request.body;
    const giftcodeService = Container.get<GiftCodeService>(GiftCodeService);
    const data = await giftcodeService.addGiftcode(
      giftcode,
      wallet,
      discordName,
    );

    ctx.body = new ResponseBuilder(data).build();
  },
);

export { GiftCodeRoute };
