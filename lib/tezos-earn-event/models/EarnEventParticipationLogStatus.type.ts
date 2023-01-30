export const EarnEventParticipationLogStatus: {
  COMPLETED: 'COMPLETED';
  CANCELED: 'CANCELED';
  CLAIMED: 'CLAIMED';
} = {
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  CLAIMED: 'CLAIMED',
};

export type EarnEventParticipationLogStatus =
  (typeof EarnEventParticipationLogStatus)[keyof typeof EarnEventParticipationLogStatus];
