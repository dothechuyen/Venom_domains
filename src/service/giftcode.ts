/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { ApiError } from '@models/api-error';
import { Service } from 'typedi';
import { ResponseCodeEnum } from '@models/enums/response-code.enum';
import { StatusCodes } from 'http-status-codes';
import { GiftCodeRepository } from '@src/repository/giftcode/giftcode.repository';

@Service()
export class GiftCodeService {
  private readonly giftcodeRepository: GiftCodeRepository;

  constructor() {
    // @InjectRepository()
    this.giftcodeRepository = new GiftCodeRepository();
  }

  async addGiftcode(
    giftcode: string,
    wallet: string,
    name: string,
  ): Promise<any> {
    try {
      const checkUsed = await this.giftcodeRepository.checkGiftcode(
        giftcode,
        name,
      );
      if (!checkUsed) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0019);
      }
      const data = await this.giftcodeRepository.addGiftcode(
        giftcode,
        wallet,
        name,
      );
      if (!data)
        throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0013);
      return data;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
