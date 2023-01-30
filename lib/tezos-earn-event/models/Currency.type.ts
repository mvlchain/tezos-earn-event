import Decimal from 'decimal.js';
import { BlockchainNetwork } from './BlockchainNetwork.type';

export type Currency = {
  id: string;
  name: string;
  alias: string | null;
  data: object;
  icon: string | null;
  network: BlockchainNetwork | null;
  contractAddress: string | null;
  /**
   * @ApiBalanceDecimalProperty(){'@common/nest'}
   */
  withdrawalFee: Decimal | null;
  balanceTransferable: boolean;
  balanceWithdrawable: boolean;
  tokenDecimal: number;
  withdrawalDelegateUserId: string | null;
};
