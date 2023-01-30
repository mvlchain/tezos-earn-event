import CurrencyRepository from '../repositories/currency-repository.interface';
import BalanceDecimal from '../../balance-decimal';
export default class TransferTezosCoinUsecase {
    private readonly currency;
    private readonly secret;
    private readonly enabled;
    constructor(secret: {
        address: string;
        privateKey: string;
    }, currency: CurrencyRepository);
    execute(currencyId: string, amount: BalanceDecimal, toAddress: string): Promise<any>;
    isTransferable(currencyId: string, amount: BalanceDecimal): Promise<readonly [boolean, BalanceDecimal]>;
    isTransferableAddress(network: string, walletAddress: string, amount: BalanceDecimal, tokenDecimal: number): Promise<readonly [boolean, BalanceDecimal]>;
    private getWallet;
    private getProvider;
}
