import Decimal from 'decimal.js';
import { EarnEventParticipationLogStatus } from './EarnEventParticipationLogStatus.type';

export type EarnEventParticipationLog = {
  id: string;
  status: EarnEventParticipationLogStatus;
  key: string;
  value: Decimal;
  earnEventId: string;
  userId: string | null;
  requestId: string;
  thirdPartyUserId: string | null;
  description: string | null;
  thirdPartyIdentifier: string | null;
  createdAt: Date;
  updatedAt: Date;
};
