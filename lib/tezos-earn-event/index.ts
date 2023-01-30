import EarnEventParticipationUsecase from './usecases/participation.usecase';
import EarnEventClaimRequestUsecase from './usecases/earn-event-claim-request.usecase';
import EarnEventClaimUsecase from './usecases/earn-event-claim.usecase';
import EarnEventParticipationCurrentUsecase from './usecases/earn-event-participation-current.usecase';
import EarnEventRepositoryInterface from './repositories/earn-event-repository.interface';
import ParticipationLogRepositoryInterface from './repositories/participation-log-repository.interface';
import TransferTezosCoinUsecase from './usecases/transfer-tezos-coin.usecase';
import CurrencyRepositoryInterface from './repositories/currency-repository.interface';
import EarnEventClaimRepositoryInterface from './repositories/earn-event-claim-repository.interface';

export {
  ParticipationLogRepositoryInterface,
  EarnEventRepositoryInterface,
  CurrencyRepositoryInterface,
  EarnEventClaimRepositoryInterface,
};
export default class TezosEarnEvent {
  private participationUsecase: EarnEventParticipationUsecase;
  private earnEventParticipationCurrentUsecase: EarnEventParticipationCurrentUsecase;
  private earnEventClaimUsecase: EarnEventClaimUsecase;
  private transferTezosCoinUsecase: TransferTezosCoinUsecase;
  private earnEventClaimRequestUsecase: EarnEventClaimRequestUsecase;

  constructor(
    tezosWalletSecret: {
      address: string;
      privateKey: string;
    },
    private readonly earnEventParticipationLogRepository: ParticipationLogRepositoryInterface,
    private readonly earnEventRepository: EarnEventRepositoryInterface,
    private readonly currencyRepository: CurrencyRepositoryInterface,
    private readonly earnEventClaimRepository: EarnEventClaimRepositoryInterface,
  ) {
    this.earnEventParticipationCurrentUsecase = new EarnEventParticipationCurrentUsecase(
      earnEventParticipationLogRepository,
      earnEventRepository,
    );
    this.earnEventClaimUsecase = new EarnEventClaimUsecase(
      this.earnEventParticipationLogRepository,
      this.earnEventParticipationCurrentUsecase,
    );
    this.participationUsecase = new EarnEventParticipationUsecase(
      earnEventParticipationLogRepository,
      earnEventRepository,
      this.earnEventParticipationCurrentUsecase,
      this.earnEventClaimUsecase,
    );
    this.transferTezosCoinUsecase = new TransferTezosCoinUsecase(
      tezosWalletSecret,
      currencyRepository,
    );
    this.earnEventClaimRequestUsecase = new EarnEventClaimRequestUsecase(
      earnEventParticipationLogRepository,
      this.earnEventClaimUsecase,
      earnEventClaimRepository,
      this.transferTezosCoinUsecase,
    );
  }

  public setPoint(
    eventAlias: string,
    value: string,
    pointKey: string,
    uniqueString: string,
    date?: Date,
  ) {
    return this.participationUsecase.execute(
      date ?? new Date(),
      eventAlias,
      value,
      pointKey,
      uniqueString,
    );
  }

  public getClaimInformation(earnEventId: string, userId: string, isIncludeClaimed?: boolean) {
    return this.earnEventClaimUsecase.execute(isIncludeClaimed ?? true, earnEventId, userId);
  }

  public claim(earnEventId: string, userId: string, walletAddress: string, date?: Date) {
    return this.earnEventClaimRequestUsecase.execute(
      earnEventId,
      userId,
      date ?? new Date(),
      walletAddress,
    );
  }
}
