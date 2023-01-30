import { EarnEventClaimStatus } from './EarnEventClaimStatus.type';
export type EarnEventClaim = {
    id: string;
    status: EarnEventClaimStatus;
    earnEventId: string;
    userId: string;
    thirdPartyUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
};
