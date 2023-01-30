export declare const EarnEventClaimStatus: {
    INCOMING: 'INCOMING';
    COMPLETED_TRANSFER: 'COMPLETED_TRANSFER';
    FAILED_TRANSFER: 'FAILED_TRANSFER';
    FAILED_WITHDRAW: 'FAILED_WITHDRAW';
    COMPLETED: 'COMPLETED';
    CANCELED: 'CANCELED';
};
export type EarnEventClaimStatus = (typeof EarnEventClaimStatus)[keyof typeof EarnEventClaimStatus];
