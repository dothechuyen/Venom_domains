import { UserTypeEnum } from '@models/enums/user.status';

export class UserInfo {
  id: number;

  name: string;

  email: string;

  walletAddress: string;

  network: number;

  userType: UserTypeEnum;
}
