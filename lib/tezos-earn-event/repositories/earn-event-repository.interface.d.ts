import { EarnEvent } from '../models';
export default interface EarnEventRepositoryInterface {
    findByAppIdAndAlias: (alias: string) => Promise<EarnEvent>;
    findById: (id: string) => Promise<EarnEvent>;
}
