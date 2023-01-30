import { BigNumberish } from '@ethersproject/bignumber';
import Decimal from 'decimal.js';
import { ethers } from 'ethers';

export default class BalanceDecimal extends Decimal {
  constructor(value: Decimal.Value) {
    super(value);
  }

  static fromBigNumber(amount: BigNumberish, unitNameOrTokenDecimal?: string | BigNumberish) {
    return new BalanceDecimal(ethers.utils.formatUnits(amount, unitNameOrTokenDecimal));
  }

  static sum(...n: any): BalanceDecimal {
    return new BalanceDecimal(Decimal.sum(n));
  }

  toBigNumber(tokenDecimal: number) {
    return ethers.utils.parseUnits(`${this.toFixed(tokenDecimal)}`, tokenDecimal);
  }

  toString(): string {
    return this.toFixed();
  }

  toFixed(decimalPlaces?: number): string;
  toFixed(decimalPlaces: number, rounding: Decimal.Rounding): string;
  toFixed(decimalPlaces?: any, rounding?: any): string {
    return super.toFixed(decimalPlaces, rounding ? rounding : Decimal.ROUND_FLOOR);
  }

  toFixedDecimal(decimalPlaces = 8) {
    return new BalanceDecimal(this.toFixed(decimalPlaces));
  }

  mustBeInteger(): number {
    if (!this.isInteger()) throw new Error(`Amount ${this} is not an integer!`);
    return this.toNumber();
  }

  plus(value): BalanceDecimal {
    return new BalanceDecimal(super.plus(value));
  }

  sub(value): BalanceDecimal {
    return new BalanceDecimal(super.sub(value));
  }

  mul(value): BalanceDecimal {
    return new BalanceDecimal(super.mul(value));
  }

  dividedBy(value): BalanceDecimal {
    return new BalanceDecimal(super.dividedBy(value));
  }

  div(value): BalanceDecimal {
    return new BalanceDecimal(super.div(value));
  }

  lt(value): boolean {
    return super.lt(value);
  }

  lte(value): boolean {
    return super.lte(value);
  }

  gt(value): boolean {
    return super.gt(value);
  }

  gte(value): boolean {
    return super.gte(value);
  }

  negated(): BalanceDecimal {
    return new BalanceDecimal(super.negated());
  }

  round(): BalanceDecimal {
    return new BalanceDecimal(super.round());
  }
}
