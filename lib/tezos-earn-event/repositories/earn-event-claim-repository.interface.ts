import { EarnEventClaim, EarnEventClaimStatus } from '../models';

export default interface EarnEventClaimRepositoryInterface {
  create: (
    earnEventId: string,
    userId: string,
    status: EarnEventClaimStatus,
    thirdPartyUserId?: string,
  ) => Promise<EarnEventClaim>;

  findById: (id: string) => Promise<EarnEventClaim>;

  findByEarnEventIdAndUserId: (earnEventId: string, userId: string) => Promise<EarnEventClaim[]>;

  findOnlyActiveByEarnEventIdAndUserId: (
    earnEventId: string,
    userId: string,
  ) => Promise<EarnEventClaim[]>;

  updateStatusByIdAndStatus: (id: string, status: EarnEventClaimStatus) => Promise<EarnEventClaim>;
  updateFaildById: (id: string) => Promise<void>;
}
