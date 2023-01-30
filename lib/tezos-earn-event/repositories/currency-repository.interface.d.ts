import { Currency } from '../models';
export default interface CurrencyRepositoryInterface {
    require: (id: string) => Promise<Currency>;
}
