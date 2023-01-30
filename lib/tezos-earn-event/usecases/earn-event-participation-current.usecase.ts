import BalanceDecimal from '../../balance-decimal';
import { EarnEventPointInfoType } from '../constants/earn-event-point-info.type';
import ErrorService from '../constants/claim-error';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventRepository from '../repositories/earn-event-repository.interface';

export default class EarnEventParticipationCurrentUsecase {
  private earnEventErrorService: ErrorService = new ErrorService();

  constructor(
    private readonly earnEventParticipationLogRepository: EarnEventParticipationLogRepository,
    private readonly earnEventRepository: EarnEventRepository,
  ) {}

  async execute(isIncludeClaimed: boolean, earnEventId: string, userId?: string) {
    const earnEvent = await this.earnEventRepository.findById(earnEventId);
    if (!earnEvent) {
      throw this.earnEventErrorService.notFoundEarnEventException(earnEventId);
    }
    let isIncludeClaimedFlag = isIncludeClaimed;
    if (earnEvent.isAllowParticipationInClaim) {
      isIncludeClaimedFlag = false;
    }
    const pointArr = (earnEvent.pointArr ?? []) as EarnEventPointInfoType[];
    const groupByResult = userId
      ? await this.earnEventParticipationLogRepository.totalValueGroupByKeyByEarnEventAndUserOrThirdPartyIdentifier(
          earnEventId,
          isIncludeClaimedFlag,
          userId,
        )
      : await this.earnEventParticipationLogRepository.totalValueGroupByKeyByEarnEvent(earnEventId);
    return {
      earnEvent,
      pointSumArr: pointArr.map((p) => ({
        ...p,
        sum: new BalanceDecimal(groupByResult.find((g) => g.key === p.key)?._sum.value ?? 0),
      })),
    };
  }
}
