export const EarnEventClaimType: {
  CONSTANT: 'CONSTANT';
  RATIO_DIVISION: 'RATIO_DIVISION';
} = {
  CONSTANT: 'CONSTANT',
  RATIO_DIVISION: 'RATIO_DIVISION',
};

export type EarnEventClaimType = (typeof EarnEventClaimType)[keyof typeof EarnEventClaimType];
