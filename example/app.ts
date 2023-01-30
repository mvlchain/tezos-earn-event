import TezosEarnEvent, {
  CurrencyRepositoryInterface,
  EarnEventRepositoryInterface,
  EarnEventClaimRepositoryInterface,
  ParticipationLogRepositoryInterface,
} from '../lib/tezos-earn-event';
import {
  Currency,
  EarnEvent,
  EarnEventClaim,
  EarnEventClaimStatus,
  EarnEventParticipationLog,
  EarnEventParticipationLogStatus,
} from './tezos-earn-event/models';
import {
  dummyCurrency,
  dummyEarnEvent,
  dummyEarnEventClaim,
  dummyEarnEventParticipationLog,
} from './mock';
import BalanceDecimal from './balance-decimal';
import { EarnEventPointInfoType } from './tezos-earn-event/constants/earn-event-point-info.type';

const main = async () => {
  const currencyRepo = new CurrencyRepository();
  const earnEventRepo = new EarnEventRepository();
  const earnEventClaimRepo = new EarnEventClaimRepository();
  const participationLogRepo = new ParticipationLogRepository();

  const tezosEarnEvent = new TezosEarnEvent(
    {
      address: 'tz1 dummy address',
      privateKey: 'dummy pk',
    },
    participationLogRepo,
    earnEventRepo,
    currencyRepo,
    earnEventClaimRepo,
  );

  // set point
  await tezosEarnEvent.setPoint('dummy as', '1', 'ko', 'unique string');

  // get claim information
  await tezosEarnEvent.getClaimInformation('earn id', 'user id');

  // request claim information
  await tezosEarnEvent.claim('event id', 'user id', 'tz1 address');
};

main();

class CurrencyRepository implements CurrencyRepositoryInterface {
  require(id: string): Promise<Currency> {
    return Promise.resolve(dummyCurrency);
  }
}

class EarnEventRepository implements EarnEventRepositoryInterface {
  findByAppIdAndAlias(alias: string): Promise<EarnEvent> {
    return Promise.resolve(dummyEarnEvent);
  }
  findById(id: string): Promise<EarnEvent> {
    return Promise.resolve(dummyEarnEvent);
  }
}

class EarnEventClaimRepository implements EarnEventClaimRepositoryInterface {
  create(
    earnEventId: string,
    userId: string,
    status: EarnEventClaimStatus,
    thirdPartyUserId?: string,
  ): Promise<EarnEventClaim> {
    return Promise.resolve(dummyEarnEventClaim);
  }

  findById(id: string): Promise<EarnEventClaim> {
    return Promise.resolve(dummyEarnEventClaim);
  }

  findByEarnEventIdAndUserId(earnEventId: string, userId: string): Promise<EarnEventClaim[]> {
    return Promise.resolve([dummyEarnEventClaim]);
  }

  findOnlyActiveByEarnEventIdAndUserId(
    earnEventId: string,
    userId: string,
  ): Promise<EarnEventClaim[]> {
    return Promise.resolve([dummyEarnEventClaim]);
  }

  updateStatusByIdAndStatus(id: string, status: EarnEventClaimStatus): Promise<EarnEventClaim> {
    return Promise.resolve(dummyEarnEventClaim);
  }
  updateFaildById(id: string): Promise<void> {
    return Promise.resolve();
  }
}

export class ParticipationLogRepository implements ParticipationLogRepositoryInterface {
  findByAppIdAndEarnEventAliasAndUserAndRequestId(
    earnEventAlias: string,
    requestId: string,
  ): Promise<EarnEventParticipationLog> {
    return Promise.resolve(dummyEarnEventParticipationLog);
  }

  countByAppAndEarnEventAliasAndNotCurrentUserOrThirdPartyIdentifierDistinct(
    earnEventAlias: string,
    userId?: string,
    thirdPartyIdentifier?: string,
  ): Promise<number> {
    return Promise.resolve(1);
  }

  upsertDoNothingByEarnEventAndRequestId(
    earnEventId: string,
    value: BalanceDecimal,
    key: string,
    requestId: string,
    status: EarnEventParticipationLogStatus,
    userId?: string,
    thirdPartyIdentifier?: string,
    thirdPartyUserId?: string,
    description?: string,
  ): Promise<void> {
    return Promise.resolve();
  }

  totalValueByEarnEventAndKey(
    earnEventId: string,
    point: EarnEventPointInfoType,
  ): Promise<BalanceDecimal> {
    return Promise.resolve(new BalanceDecimal(2));
  }

  totalValueByEarnEventAndLowerLimit(
    earnEventId: string,
    lowerLimitPoint: BalanceDecimal,
    point: EarnEventPointInfoType,
  ): Promise<BalanceDecimal> {
    return Promise.resolve(new BalanceDecimal(2));
  }

  totalValueGroupByKeyByEarnEventAndUserOrThirdPartyIdentifier(
    earnEventId: string,
    isIncludeClaimed: boolean,
    userId?: string,
    thirdPartyIdentifier?: string,
  ): Promise<any> {
    return Promise.resolve({});
  }

  totalValueGroupByKeyByEarnEvent(earnEventId: string): Promise<any> {
    return Promise.resolve({});
  }

  findOneByEarnEventAndUserAndApp(
    earnEventId: string,
    userId: string,
  ): Promise<EarnEventParticipationLog> {
    return Promise.resolve(dummyEarnEventParticipationLog);
  }
}
