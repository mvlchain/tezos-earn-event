import BalanceDecimal from '../../balance-decimal';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventRepository from '../repositories/earn-event-repository.interface';
export default class EarnEventParticipationCurrentUsecase {
    private readonly earnEventParticipationLogRepository;
    private readonly earnEventRepository;
    private earnEventErrorService;
    constructor(earnEventParticipationLogRepository: EarnEventParticipationLogRepository, earnEventRepository: EarnEventRepository);
    execute(isIncludeClaimed: boolean, earnEventId: string, userId?: string): Promise<{
        earnEvent: import("../models").EarnEvent;
        pointSumArr: {
            sum: BalanceDecimal;
            key: string;
            currency: import("../constants/localized-text.type").LocalizedText;
            weight: number;
            title: import("../constants/localized-text.type").LocalizedText;
        }[];
    }>;
}
