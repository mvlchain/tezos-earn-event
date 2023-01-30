import { EarnEventClaimType, EarnEventParticipationLogStatus } from '../models';
import BalanceDecimal from '../../balance-decimal';
import { EarnEventPointInfoType } from '../constants/earn-event-point-info.type';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventRepository from '../repositories/earn-event-repository.interface';
import EarnEventClaimUsecase from './earn-event-claim.usecase';
import EarnEventParticipationCurrentUsecase from './earn-event-participation-current.usecase';
import ErrorService from '../constants/earn-event-error';

export default class EarnEventParticipationUsecase {
  private errorService = new ErrorService();

  constructor(
    private readonly earnEventParticipationLogRepository: EarnEventParticipationLogRepository,
    private readonly earnEventRepository: EarnEventRepository,
    private readonly earnEventParticipationCurrentUsecase: EarnEventParticipationCurrentUsecase,
    private readonly earnEventClaimUsecase: EarnEventClaimUsecase,
  ) {}

  async execute(
    participatedAt: Date,
    alias: string,
    value: string,
    key: string,
    requestId: string,
    userId?: string,
    thirdPartyIdentifier?: string,
    description?: string,
  ) {
    const decimalValue = new BalanceDecimal(value).toFixedDecimal();
    const [earnEvent, oldEarnEventParticipationLog, currentParticipationUserCount] =
      await Promise.all([
        this.earnEventRepository.findByAppIdAndAlias(alias),
        this.earnEventParticipationLogRepository.findByAppIdAndEarnEventAliasAndUserAndRequestId(
          alias,
          requestId,
        ),
        this.earnEventParticipationLogRepository.countByAppAndEarnEventAliasAndNotCurrentUserOrThirdPartyIdentifierDistinct(
          alias,
          userId,
          thirdPartyIdentifier,
        ),
      ]);
    if (!earnEvent) {
      throw this.errorService.notFoundEarnEventByAppIdAndEarnEventAlias(alias);
    }
    const logParam = {
      earnEventAlias: alias,
      earnEventId: earnEvent.id,
      key,
      value,
      requestId,
    };
    if (
      !(
        (earnEvent.eventStartAt <= participatedAt && participatedAt < earnEvent.eventEndAt) ||
        (earnEvent.isAllowParticipationInClaim &&
          earnEvent.claimStartAt <= participatedAt &&
          participatedAt < earnEvent.claimEndAt)
      )
    ) {
      this.log('WARN', 'Not Earn Event Period', logParam);
      throw this.errorService.notEventPeriod(alias);
    }
    if (
      earnEvent.maxParticipationUserCount &&
      currentParticipationUserCount >= earnEvent.maxParticipationUserCount
    ) {
      this.log('WARN', 'Exceeded the maximum participation user count of Event', logParam);
      throw this.errorService.overFlowedMaximumParticipation(alias);
    }
    if (
      oldEarnEventParticipationLog?.status === 'COMPLETED' ||
      oldEarnEventParticipationLog?.status === 'CLAIMED'
    ) {
      this.log('LOG', 'Ignored Already Processed request', logParam);
      return;
    }

    const pointInfoArr = earnEvent.pointArr as EarnEventPointInfoType[];
    if (pointInfoArr.findIndex((v) => v.key === key) === -1) {
      this.log('WARN', 'Invalied Earn Event Key', logParam);
      throw this.errorService.invaliedKeyOfEarnEvent(alias, key);
    }
    await Promise.all([this.checkMaxReward(earnEvent, key, decimalValue)]);

    await this.earnEventParticipationLogRepository.upsertDoNothingByEarnEventAndRequestId(
      earnEvent.id,
      decimalValue,
      key,
      requestId,
      EarnEventParticipationLogStatus.COMPLETED,
      userId,
      thirdPartyIdentifier,
      description,
    );
    this.log('LOG', 'Completed Third Party Earn Event Participation Usecase', logParam);
  }

  private async checkMaxReward(earnEvent: any, key: string, value: BalanceDecimal) {
    if (!earnEvent) {
      return;
    }
    if (earnEvent.claimType === EarnEventClaimType.CONSTANT) {
      const earnEventAndPointSumArr = await this.earnEventParticipationCurrentUsecase.execute(
        false,
        earnEvent.id,
      );
      const selectedPoint = earnEventAndPointSumArr.pointSumArr.find((p) => p.key === key);
      if (!selectedPoint) {
        return;
      }
      selectedPoint.sum = selectedPoint.sum.plus(value);
      const { totalReward } = await this.earnEventClaimUsecase.returnTotalReward(
        earnEventAndPointSumArr,
      );
      if (totalReward.gt(earnEvent.maxReward)) {
        throw this.errorService.overFlowedMaximumReward(earnEvent.alias);
      }
    }
  }

  private log(
    type: 'LOG' | 'WARN' | 'ERROR',
    message: string,
    param: {
      earnEventAlias: string;
      earnEventId: string;
      key: string;
      value: string;
      requestId: string;
    },
  ) {
    const logMessage = `${message} - RequestId: ${param.requestId} EarnEvent: {id: ${param.earnEventAlias}, alias: ${param.earnEventAlias}, Key: ${param.key}, Value: ${param.value}`;
    if (type === 'LOG') {
      console.log(logMessage);
    } else if (type === 'WARN') {
      console.warn(logMessage);
    } else {
      console.error(logMessage);
    }
  }
}
