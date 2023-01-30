const Region: {
  SG: 'SG';
  VN: 'VN';
  KH: 'KH';
} = {
  SG: 'SG',
  VN: 'VN',
  KH: 'KH',
};

type Region = (typeof Region)[keyof typeof Region];

type RegionType = {
  timezone: string;
  offset: number;
};

export const RegionDictionary: Record<Region, RegionType> = {
  SG: {
    timezone: 'Asia/Singapore',
    offset: 8,
  },
  KH: {
    timezone: 'Asia/Phnom_Penh',
    offset: 7,
  },
  VN: {
    timezone: 'Asia/Ho_Chi_Minh',
    offset: 7,
  },
};
