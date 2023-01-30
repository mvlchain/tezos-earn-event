import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import CurrencyRepository from '../repositories/currency-repository.interface';
import BalanceDecimal from '../../balance-decimal';

export default class TransferTezosCoinUsecase {
  private readonly secret: { address: string; privateKey: string };
  private readonly enabled: boolean;

  constructor(
    secret: { address: string; privateKey: string },
    private readonly currency: CurrencyRepository,
  ) {
    this.secret = secret;
  }

  async execute(currencyId: string, amount: BalanceDecimal, toAddress: string): Promise<any> {
    if (!this.secret) throw new Error(`This currency is not available!: ${currencyId}`);
    const { address: fromAddress, privateKey } = this.secret;
    const { network, tokenDecimal } = await this.currency.require(currencyId);
    if (!network) throw new Error(`Unknown XTZ! ${network}`);

    const [transferable, currentBalance] = await this.isTransferableAddress(
      network,
      fromAddress,
      amount,
      tokenDecimal,
    );

    console.warn(
      `\n===== Withdrawal ${currencyId} =====\nTransferable: ${transferable}, Current Balance: ${currentBalance}, Transfer Amount: ${amount}`,
    );
    if (!transferable) throw new Error('Insufficient balance');

    const wallet = this.getWallet(network, privateKey);

    const tx = await wallet
      .transfer({
        to: toAddress,
        amount: amount.toNumber(),
      })
      .send();
    const operationResult = await tx.transactionOperation();
    const result = await tx.confirmation();
    return {
      blockNumber: result.block.header.level,
      transactionHash: tx.opHash,
      isSuccess: result.completed,
      payload: {
        opHash: tx.opHash,
        level: result.block.header.level,
        ...operationResult,
      },
      to: toAddress,
      from: fromAddress,
      contractAddress: '',
    };
  }

  async isTransferable(currencyId: string, amount: BalanceDecimal) {
    const secret = this.secret[currencyId];
    if (!secret) throw new Error('No wallet info: Unknown XTZ!');

    const { address } = secret;
    const { network, tokenDecimal } = await this.currency.require(currencyId);
    if (!network) throw new Error('No currency network info: Unknown XTZ!');

    return await this.isTransferableAddress(network, address, amount, tokenDecimal);
  }
  async isTransferableAddress(
    network: string,
    walletAddress: string,
    amount: BalanceDecimal,
    tokenDecimal: number,
  ): Promise<readonly [boolean, BalanceDecimal]> {
    const provider = this.getProvider(network);
    const balance = await provider.tz.getBalance(walletAddress.trim());
    const balanceDecimal = BalanceDecimal.fromBigNumber(balance.toString(), tokenDecimal);
    console.warn(`Wallet ${walletAddress} ETH Balance: ${balance}`);
    return [amount.lte(balanceDecimal), balanceDecimal] as const;
  }

  private getWallet(network: string, privateKey: string) {
    const provider = this.getProvider(network);
    provider.setProvider({
      signer: new InMemorySigner(privateKey),
    });
    return provider.wallet;
  }
  private getProvider(rpcURL: string) {
    return new TezosToolkit(rpcURL);
  }
}
