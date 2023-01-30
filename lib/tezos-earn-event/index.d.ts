import EarnEventRepositoryInterface from './repositories/earn-event-repository.interface';
import ParticipationLogRepositoryInterface from './repositories/participation-log-repository.interface';
import CurrencyRepositoryInterface from './repositories/currency-repository.interface';
import EarnEventClaimRepositoryInterface from './repositories/earn-event-claim-repository.interface';
export { ParticipationLogRepositoryInterface, EarnEventRepositoryInterface, CurrencyRepositoryInterface, EarnEventClaimRepositoryInterface, };
export default class TezosEarnEvent {
    private readonly earnEventParticipationLogRepository;
    private readonly earnEventRepository;
    private readonly currencyRepository;
    private readonly earnEventClaimRepository;
    private participationUsecase;
    private earnEventParticipationCurrentUsecase;
    private earnEventClaimUsecase;
    private transferTezosCoinUsecase;
    private earnEventClaimRequestUsecase;
    constructor(tezosWalletSecret: {
        address: string;
        privateKey: string;
    }, earnEventParticipationLogRepository: ParticipationLogRepositoryInterface, earnEventRepository: EarnEventRepositoryInterface, currencyRepository: CurrencyRepositoryInterface, earnEventClaimRepository: EarnEventClaimRepositoryInterface);
    setPoint(eventAlias: string, value: string, pointKey: string, uniqueString: string, date?: Date): Promise<void>;
    getClaimInformation(earnEventId: string, userId: string, isIncludeClaimed?: boolean): Promise<{
        earnEvent: any;
        currentPoint: import("../balance-decimal").default;
        lowerLimitPoint: import("../balance-decimal").default;
        totalReward: import("../balance-decimal").default;
        subCurrencyToCurrencyExchangeRate?: import("../balance-decimal").default | undefined;
        subCurrencyValue?: import("../balance-decimal").default | undefined;
    }>;
    claim(earnEventId: string, userId: string, walletAddress: string, date?: Date): Promise<any>;
}
