import { BigNumberish } from '@ethersproject/bignumber';
import Decimal from 'decimal.js';
import { ethers } from 'ethers';
export default class BalanceDecimal extends Decimal {
    constructor(value: Decimal.Value);
    static fromBigNumber(amount: BigNumberish, unitNameOrTokenDecimal?: string | BigNumberish): BalanceDecimal;
    static sum(...n: any): BalanceDecimal;
    toBigNumber(tokenDecimal: number): ethers.BigNumber;
    toString(): string;
    toFixed(decimalPlaces?: number): string;
    toFixed(decimalPlaces: number, rounding: Decimal.Rounding): string;
    toFixedDecimal(decimalPlaces?: number): BalanceDecimal;
    mustBeInteger(): number;
    plus(value: any): BalanceDecimal;
    sub(value: any): BalanceDecimal;
    mul(value: any): BalanceDecimal;
    dividedBy(value: any): BalanceDecimal;
    div(value: any): BalanceDecimal;
    lt(value: any): boolean;
    lte(value: any): boolean;
    gt(value: any): boolean;
    gte(value: any): boolean;
    negated(): BalanceDecimal;
    round(): BalanceDecimal;
}
