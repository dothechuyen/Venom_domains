import DEADcoinModel from '@entities/mongo-entities/ino/DEADcoin.entity';
import giftcodeModel from '@entities/mongo-entities/ino/giftcode.entity';

export class GiftCodeRepository {
  async getUser(name: string): Promise<any> {
    const nameDiscord = 'user.name';
    const data = await DEADcoinModel.findOne({
      [nameDiscord]: name,
    });

    return data;
  }

  async checkGiftcode(giftcode: string, discordName: string): Promise<any> {
    try {
      const data: any = await giftcodeModel.findOne({
        code: giftcode,
      });
      if (!data) {
        return false;
      }
      if (!data.isUsed) {
        const save = await giftcodeModel.findOneAndUpdate(
          { code: giftcode },
          { $set: { isUsed: true, usedBy: discordName } },
          { new: true },
        );
        return save;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  async addGiftcode(
    giftcode: string,
    wallet: string,
    name: string,
  ): Promise<any> {
    try {
      const nameDiscord = 'user.name';
      const userGiftcode = 'user.giftcode';
      const userWallet = 'user.wallet';
      const data = await DEADcoinModel.findOneAndUpdate(
        {
          [nameDiscord]: name,
        },
        {
          $set: { [userGiftcode]: giftcode, [userWallet]: wallet },
        },
        { upsert: true, new: true },
      );

      return data;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
