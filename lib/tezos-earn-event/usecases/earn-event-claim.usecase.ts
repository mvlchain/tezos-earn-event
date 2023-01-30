import { EarnEvent, EarnEventClaimType } from '../models';
import BalanceDecimal from '../../balance-decimal';
import { EarnEventPointInfoType } from '../constants/earn-event-point-info.type';
import ErrorService from '../constants/claim-error';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventParticipationCurrentUsecase from './earn-event-participation-current.usecase';

export default class EarnEventClaimUsecase {
  private eventErrorService: ErrorService = new ErrorService();

  constructor(
    private readonly earnEventParticipationLogRepository: EarnEventParticipationLogRepository,
    private readonly earnEventParticipationCurrentUsecase: EarnEventParticipationCurrentUsecase,
  ) {}

  async execute(
    isIncludeClaimed: boolean,
    earnEventId: string,
    userId: string,
    resultOfEarnEventParticipationCurrentUsecase?: any,
  ): Promise<{
    earnEvent: any;
    currentPoint: BalanceDecimal;
    lowerLimitPoint: BalanceDecimal;
    totalReward: BalanceDecimal;
    subCurrencyToCurrencyExchangeRate?: BalanceDecimal;
    subCurrencyValue?: BalanceDecimal;
  }> {
    let earnEventAndPointSumArr: any;
    if (resultOfEarnEventParticipationCurrentUsecase) {
      earnEventAndPointSumArr = resultOfEarnEventParticipationCurrentUsecase;
    } else {
      earnEventAndPointSumArr = await this.earnEventParticipationCurrentUsecase.execute(
        isIncludeClaimed,
        earnEventId,
        userId,
      );
    }
    const { earnEvent } = earnEventAndPointSumArr;
    const currentPoint = this.returnPointSumByPointSumArr(earnEventAndPointSumArr);

    let totalReward = new BalanceDecimal(0);
    const { lowerLimitPoint, totalReward: tempTotalReward } = await this.returnTotalReward(
      earnEventAndPointSumArr,
    );
    totalReward = tempTotalReward;

    const exchangeRate: BalanceDecimal | undefined = undefined;
    let subCurrencyValue = new BalanceDecimal(earnEvent.subCurrencyReward ?? 0);

    const isLowerThanLimit = lowerLimitPoint.gt(currentPoint);
    if (isLowerThanLimit) {
      totalReward = new BalanceDecimal(0);
    }

    if (totalReward.lte(0)) {
      totalReward = new BalanceDecimal(0);
      subCurrencyValue = new BalanceDecimal(0);
    }

    return {
      earnEvent,
      currentPoint,
      lowerLimitPoint,
      totalReward,
      subCurrencyToCurrencyExchangeRate: exchangeRate,
      subCurrencyValue: earnEvent.subCurrency ? subCurrencyValue : undefined,
    };
  }

  returnPointSumByPointSumArr(earnEventAndPointSumArr: any) {
    const { pointSumArr } = earnEventAndPointSumArr;

    return pointSumArr
      .map((p) => p.sum.mul(p.weight))
      .reduce((prev, cur) => prev.plus(cur), new BalanceDecimal(0));
  }

  async returnTotalReward(earnEventAndPointSumArr: any): Promise<{
    totalReward: BalanceDecimal;
    lowerLimitPoint: BalanceDecimal;
  }> {
    const { earnEvent, pointSumArr } = earnEventAndPointSumArr;
    const sumValue = pointSumArr
      .map((p) => p.sum.mul(p.weight))
      .reduce((prev, cur) => prev.plus(cur), new BalanceDecimal(0));
    let totalReward = new BalanceDecimal(0);
    let lowerLimitPoint = new BalanceDecimal(0);
    switch (earnEvent.claimType) {
      case EarnEventClaimType.CONSTANT:
        totalReward = this.calcConstantValue(earnEvent, sumValue);
        break;
      case EarnEventClaimType.RATIO_DIVISION:
        const calcRatioDivisionResult = await this.calcRatioDivisionValue(earnEvent, sumValue);
        totalReward = calcRatioDivisionResult.totalReward;
        lowerLimitPoint = calcRatioDivisionResult.lowerLimitPoint;
        break;
    }
    return {
      totalReward: totalReward.toFixedDecimal(),
      lowerLimitPoint,
    };
  }

  private calcConstantValue(earnEvent: EarnEvent, sumValue: BalanceDecimal) {
    return earnEvent.rewardPerValue
      ? sumValue.mul(earnEvent.rewardPerValue)
      : new BalanceDecimal(0);
  }

  async returnLowerLimitPoint(earnEvent: EarnEvent, inTotalSumValue?: BalanceDecimal) {
    if (!earnEvent.lowerLimitReward) {
      return new BalanceDecimal(0);
    }
    let totalSumValue: BalanceDecimal;
    if (inTotalSumValue) {
      totalSumValue = inTotalSumValue;
    } else {
      totalSumValue = await this.returnTotalSumValue(earnEvent);
    }
    const lowerLimitReward = new BalanceDecimal(earnEvent.lowerLimitReward ?? 0);
    const lowerLimitPoint = lowerLimitReward.mul(totalSumValue).dividedBy(earnEvent.maxReward);
    return lowerLimitPoint;
  }

  private async calcRatioDivisionValue(earnEvent: EarnEvent, sumValue: BalanceDecimal) {
    let totalSumValue = await this.returnTotalSumValue(earnEvent);
    let lowerLimitPoint = new BalanceDecimal(0);
    let totalReward = new BalanceDecimal(0);
    if (earnEvent.lowerLimitReward?.gt(0)) {
      lowerLimitPoint = await this.returnLowerLimitPoint(earnEvent, totalSumValue);
      totalSumValue = await this.returnTotalSumValueByLowerLimitPoint(earnEvent, lowerLimitPoint);
    }

    if (totalSumValue.gt(0)) {
      totalReward = sumValue.dividedBy(totalSumValue).mul(earnEvent.maxReward);
    } else {
      totalReward = new BalanceDecimal(0);
    }
    return {
      totalReward,
      lowerLimitPoint,
    };
  }

  async returnTotalSumValue(earnEvent: EarnEvent) {
    const promiseAllArr = await Promise.all(
      (earnEvent.pointArr as EarnEventPointInfoType[]).map((p) =>
        this.earnEventParticipationLogRepository.totalValueByEarnEventAndKey(earnEvent.id, p),
      ),
    );
    return promiseAllArr.reduce((pre, cur) => pre.plus(cur), new BalanceDecimal(0));
  }

  async returnTotalSumValueByLowerLimitPoint(
    earnEvent: EarnEvent,
    lowerLimitPoint: BalanceDecimal,
  ) {
    const promiseAllArr = await Promise.all(
      (earnEvent.pointArr as EarnEventPointInfoType[]).map((p) =>
        this.earnEventParticipationLogRepository.totalValueByEarnEventAndLowerLimit(
          earnEvent.id,
          lowerLimitPoint,
          p,
        ),
      ),
    );
    return promiseAllArr.reduce((pre, cur) => pre.plus(cur), new BalanceDecimal(0));
  }
}
