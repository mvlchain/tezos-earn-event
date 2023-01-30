import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventRepository from '../repositories/earn-event-repository.interface';
import EarnEventClaimUsecase from './earn-event-claim.usecase';
import EarnEventParticipationCurrentUsecase from './earn-event-participation-current.usecase';
export default class EarnEventParticipationUsecase {
    private readonly earnEventParticipationLogRepository;
    private readonly earnEventRepository;
    private readonly earnEventParticipationCurrentUsecase;
    private readonly earnEventClaimUsecase;
    private errorService;
    constructor(earnEventParticipationLogRepository: EarnEventParticipationLogRepository, earnEventRepository: EarnEventRepository, earnEventParticipationCurrentUsecase: EarnEventParticipationCurrentUsecase, earnEventClaimUsecase: EarnEventClaimUsecase);
    execute(participatedAt: Date, alias: string, value: string, key: string, requestId: string, userId?: string, thirdPartyIdentifier?: string, description?: string): Promise<void>;
    private checkMaxReward;
    private log;
}
