declare const Region: {
    SG: 'SG';
    VN: 'VN';
    KH: 'KH';
};
type Region = (typeof Region)[keyof typeof Region];
type RegionType = {
    timezone: string;
    offset: number;
};
export declare const RegionDictionary: Record<Region, RegionType>;
export {};
