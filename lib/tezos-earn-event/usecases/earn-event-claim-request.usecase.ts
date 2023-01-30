import { Currency, EarnEventClaim, EarnEventClaimStatus } from '../models';
import { v4 as uuidv4 } from 'uuid';
import ErrorService from '../constants/claim-error';
import EarnEventClaimRepository from '../repositories/earn-event-claim-repository.interface';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventClaimUsecase from './earn-event-claim.usecase';
import TransferTezosCoinUsecase from '../usecases/transfer-tezos-coin.usecase';
import BalanceDecimal from '../../balance-decimal';

export default class EarnEventClaimRequestUsecase {
  private readonly errorService: ErrorService = new ErrorService();
  constructor(
    private readonly earnEventParticipationLogRepository: EarnEventParticipationLogRepository,
    private readonly earnEventClaimUsecase: EarnEventClaimUsecase,
    private readonly earnEventClaimRepository: EarnEventClaimRepository,
    private readonly transferTezosCoinUsecase: TransferTezosCoinUsecase,
  ) {}

  async execute(earnEventId: string, userId: string, now: Date, wallletAddress: string) {
    const logParam = {
      userId,
      earnEventId,
    };

    const {
      earnEvent,
      totalReward: totalAmount,
      subCurrencyToCurrencyExchangeRate,
      subCurrencyValue,
    } = await this.earnEventClaimUsecase.execute(false, earnEventId, userId);

    if (!earnEvent) {
      this.log('WARN', `Not Found Earn Event`, logParam);
      throw this.errorService.notFoundEarnEventException(earnEventId);
    }

    if (earnEvent.claimStartAt > now || earnEvent.claimEndAt < now) {
      this.log('WARN', `Not Claimable Period`, logParam);
      throw this.errorService.notClaimablePeriod(earnEventId);
    }

    let fee = new BalanceDecimal(earnEvent.currency.withdrawalFee ?? 0);

    const [oldStatusResult, earnEventParticipationLogArr] = await Promise.all([
      this.earnEventClaimRepository.findOnlyActiveByEarnEventIdAndUserId(earnEventId, userId),
      this.earnEventParticipationLogRepository.findOneByEarnEventAndUserAndApp(earnEventId, userId),
    ]);
    if (
      (oldStatusResult.length > 0 &&
        (oldStatusResult[0].status === EarnEventClaimStatus.INCOMING ||
          oldStatusResult[0].status === EarnEventClaimStatus.COMPLETED_TRANSFER)) || // 진행중인 내역이 있을경우
      (!earnEvent.isAllowParticipationInClaim && oldStatusResult.length > 0) // isAllowParticipationInClaim이 false이고 내역(COMPLETED)이 있을경우
    ) {
      const error = this.errorService.alreadyClaimed(earnEventId, userId);
      this.log('WARN', error.message, logParam);
      throw error;
    }
    if (
      !(
        oldStatusResult.length === 0 ||
        (earnEvent.isAllowParticipationInClaim && oldStatusResult[0].status === 'COMPLETED')
      )
    ) {
      const error = this.errorService.alreadyClaimed(earnEventId, userId);
      this.log('WARN', error.message, logParam);
      throw error;
    }

    const subCurrencyReward = new BalanceDecimal(subCurrencyValue ?? 0);

    const forClaimRewardInformationArr: {
      amount: BalanceDecimal;
      currency: Currency;
      fee: BalanceDecimal;
      balanceWithdrawalRequestId: string;
    }[] = [
      {
        amount: totalAmount,
        currency: earnEvent.currency,
        fee,
        balanceWithdrawalRequestId: uuidv4(),
      },
    ];

    // SubCurrency가 존재하면 실행
    if (earnEvent.subCurrency && subCurrencyReward.gt(0) && subCurrencyToCurrencyExchangeRate) {
      const subFee = earnEvent.subCurrency?.withdrawalFee?.mul(subCurrencyToCurrencyExchangeRate);
      fee = fee.plus(subFee ?? 0);

      // SubCurrency의 fee를 연산후에 MainCurrency의 리워드가 0이하일경우 트랜잭션을 실행하지 않게 제외한다.
      forClaimRewardInformationArr[0].fee = fee;

      forClaimRewardInformationArr.push({
        amount: subCurrencyReward,
        currency: earnEvent.subCurrency,
        fee: new BalanceDecimal(0),
        balanceWithdrawalRequestId: uuidv4(),
      });
    }

    if (forClaimRewardInformationArr[0].amount.lte(fee)) {
      forClaimRewardInformationArr.shift();
    }

    if (forClaimRewardInformationArr.length === 0) {
      const error = this.errorService.notEnoughClaimReward(earnEventId);
      this.log('WARN', error.message, logParam);
      throw error;
    }

    const thirdPartyUserId = earnEventParticipationLogArr[0]?.thirdPartyUserId ?? undefined;

    this.log(
      'LOG',
      `Requested Claim - ${forClaimRewardInformationArr
        .map((v) => `${v.currency.name}: ${v.amount}`)
        .join(' and ')} to Address: ${wallletAddress}.`,

      logParam,
    );

    let earnEventClaimLog: EarnEventClaim | null = null;
    // transfer
    try {
      earnEventClaimLog = await this.earnEventClaimRepository.create(
        earnEvent.id,
        userId,
        EarnEventClaimStatus.COMPLETED_TRANSFER,
        thirdPartyUserId,
      );
      this.log('LOG', `Created Claim Entity`, logParam);

      // withdraw

      return this.transferTezosCoinUsecase.execute('XTZ', totalAmount, wallletAddress);
      this.log('LOG', `Completed Earn Event Claim Request Usecase`, logParam);
    } catch (e) {
      this.log('ERROR', JSON.stringify(e), logParam);
      if (earnEventClaimLog) {
        await this.setFailedEarnEventClaim(earnEventClaimLog);
      }
      throw e;
    }
  }

  private log(
    type: 'LOG' | 'WARN' | 'ERROR',
    message: string,
    param: {
      userId: string;
      earnEventId: string;
    },
  ) {
    const logMessage = `${message} - User: ${param.userId}, EarnEvent: ${param.earnEventId}`;
    if (type === 'LOG') {
      console.log(logMessage);
    } else if (type === 'WARN') {
      console.warn(logMessage);
    } else {
      console.error(logMessage);
    }
  }

  private async setFailedEarnEventClaim(earnEventClaim: EarnEventClaim) {
    await this.earnEventClaimRepository.updateFaildById(earnEventClaim.id);
  }

  private async sleep(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
