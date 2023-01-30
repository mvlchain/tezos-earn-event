import BalanceDecimal from '../../balance-decimal';
import { EarnEventPointInfoType } from '../constants/earn-event-point-info.type';
import { EarnEventParticipationLog, EarnEventParticipationLogStatus } from '../models';
export default interface ParticipationLogRepositoryInterface {
    findByAppIdAndEarnEventAliasAndUserAndRequestId: (earnEventAlias: string, requestId: string) => Promise<EarnEventParticipationLog>;
    countByAppAndEarnEventAliasAndNotCurrentUserOrThirdPartyIdentifierDistinct: (earnEventAlias: string, userId?: string, thirdPartyIdentifier?: string) => Promise<number>;
    upsertDoNothingByEarnEventAndRequestId: (earnEventId: string, value: BalanceDecimal, key: string, requestId: string, status: EarnEventParticipationLogStatus, userId?: string, thirdPartyIdentifier?: string, thirdPartyUserId?: string, description?: string) => Promise<void>;
    totalValueByEarnEventAndKey: (earnEventId: string, point: EarnEventPointInfoType) => Promise<BalanceDecimal>;
    totalValueByEarnEventAndLowerLimit: (earnEventId: string, lowerLimitPoint: BalanceDecimal, point: EarnEventPointInfoType) => Promise<BalanceDecimal>;
    totalValueGroupByKeyByEarnEventAndUserOrThirdPartyIdentifier: (earnEventId: string, isIncludeClaimed: boolean, userId?: string, thirdPartyIdentifier?: string) => Promise<any>;
    totalValueGroupByKeyByEarnEvent: (earnEventId: string) => Promise<any>;
    findOneByEarnEventAndUserAndApp: (earnEventId: string, userId: string) => Promise<EarnEventParticipationLog>;
}
