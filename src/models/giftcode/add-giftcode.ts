import { IsNotEmpty } from 'class-validator';

export class GiftCodeModel {
  @IsNotEmpty()
  giftcode: string;

  @IsNotEmpty()
  wallet: string;

  @IsNotEmpty()
  discordName: string;
}
