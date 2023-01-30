import EarnEventClaimRepository from '../repositories/earn-event-claim-repository.interface';
import EarnEventParticipationLogRepository from '../repositories/participation-log-repository.interface';
import EarnEventClaimUsecase from './earn-event-claim.usecase';
import TransferTezosCoinUsecase from '../usecases/transfer-tezos-coin.usecase';
export default class EarnEventClaimRequestUsecase {
    private readonly earnEventParticipationLogRepository;
    private readonly earnEventClaimUsecase;
    private readonly earnEventClaimRepository;
    private readonly transferTezosCoinUsecase;
    private readonly errorService;
    constructor(earnEventParticipationLogRepository: EarnEventParticipationLogRepository, earnEventClaimUsecase: EarnEventClaimUsecase, earnEventClaimRepository: EarnEventClaimRepository, transferTezosCoinUsecase: TransferTezosCoinUsecase);
    execute(earnEventId: string, userId: string, now: Date, wallletAddress: string): Promise<any>;
    private log;
    private setFailedEarnEventClaim;
    private sleep;
}
