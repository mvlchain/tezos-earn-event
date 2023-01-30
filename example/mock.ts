import Decimal from 'decimal.js';
import {
  BlockchainNetwork,
  Currency,
  EarnEvent,
  EarnEventClaim,
  EarnEventClaimStatus,
  EarnEventClaimType,
  EarnEventParticipationLog,
  EarnEventParticipationLogStatus,
} from './tezos-earn-event/models';

export const dummyCurrency: Currency = {
  id: 'dummy id',
  name: 'dummmy name',
  alias: 'dummy alias',
  data: {},
  icon: 'dummy icon',
  network: BlockchainNetwork.XTZ,
  contractAddress: null,
  withdrawalFee: new Decimal('0.01'),
  balanceTransferable: true,
  balanceWithdrawable: true,
  tokenDecimal: 6,
  withdrawalDelegateUserId: null,
};

export const dummyEarnEvent: EarnEvent = {
  id: 'dummy id',
  alias: 'dummy as',
  eventStartAt: new Date(),
  eventEndAt: new Date(),
  claimStartAt: new Date(),
  claimEndAt: new Date(),
  iconUrl: 'icon url',
  title: {
    ko: 'title',
  },
  subTitle: {
    ko: 'title',
  },
  detailPageHtml: {
    ko: 'html',
  },
  pointArr: [
    {
      unit: 'p',
    },
  ],
  pointIconUrl: 'icon url',
  eventActionButtonTitle: null,
  allowTimeRange: null,
  eventActionScheme: null,
  connectionDeepLink: null,
  currencyId: 'currency id',
  subCurrencyId: null,
  subCurrencyReward: null,
  maxReward: new Decimal(10000),
  lowerLimitReward: null,
  maxParticipationUserCount: null,
  rewardPerValue: new Decimal(0.5),
  claimType: EarnEventClaimType.CONSTANT,
  appId: 'appid',
  description: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isAllowParticipationInClaim: false,
  data: {},
};

export const dummyEarnEventClaim: EarnEventClaim = {
  id: 'id',
  status: EarnEventClaimStatus.COMPLETED,
  earnEventId: 'event id',
  userId: 'user id',
  thirdPartyUserId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const dummyEarnEventParticipationLog: EarnEventParticipationLog = {
  id: 'id',
  status: EarnEventParticipationLogStatus.COMPLETED,
  key: 'k0',
  value: new Decimal(1),
  earnEventId: 'earn event id',
  userId: 'userid',
  requestId: 'req id',
  thirdPartyUserId: 'third id',
  description: null,
  thirdPartyIdentifier: 'th identifier',
  createdAt: new Date(),
  updatedAt: new Date(),
};
