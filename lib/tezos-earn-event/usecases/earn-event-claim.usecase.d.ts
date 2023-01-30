import { EarnEvent } from '../models';
import BalanceDecimal from '../../balance-decimal';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventParticipationCurrentUsecase from './earn-event-participation-current.usecase';
export default class EarnEventClaimUsecase {
    private readonly earnEventParticipationLogRepository;
    private readonly earnEventParticipationCurrentUsecase;
    private eventErrorService;
    constructor(earnEventParticipationLogRepository: EarnEventParticipationLogRepository, earnEventParticipationCurrentUsecase: EarnEventParticipationCurrentUsecase);
    execute(isIncludeClaimed: boolean, earnEventId: string, userId: string, resultOfEarnEventParticipationCurrentUsecase?: any): Promise<{
        earnEvent: any;
        currentPoint: BalanceDecimal;
        lowerLimitPoint: BalanceDecimal;
        totalReward: BalanceDecimal;
        subCurrencyToCurrencyExchangeRate?: BalanceDecimal;
        subCurrencyValue?: BalanceDecimal;
    }>;
    returnPointSumByPointSumArr(earnEventAndPointSumArr: any): any;
    returnTotalReward(earnEventAndPointSumArr: any): Promise<{
        totalReward: BalanceDecimal;
        lowerLimitPoint: BalanceDecimal;
    }>;
    private calcConstantValue;
    returnLowerLimitPoint(earnEvent: EarnEvent, inTotalSumValue?: BalanceDecimal): Promise<BalanceDecimal>;
    private calcRatioDivisionValue;
    returnTotalSumValue(earnEvent: EarnEvent): Promise<BalanceDecimal>;
    returnTotalSumValueByLowerLimitPoint(earnEvent: EarnEvent, lowerLimitPoint: BalanceDecimal): Promise<BalanceDecimal>;
}
