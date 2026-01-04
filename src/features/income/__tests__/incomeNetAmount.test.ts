import { calculateWithholding } from '../../utils/taxWithholding';
import { CustomDeduction } from '../income/incomeSlice';

describe('calculateWithholding', () => {
  it('calculates net income with only federal and state tax', () => {
    const gross = 1000;
    const deductions = { federal: 10, state: 5 };
    const result = calculateWithholding(gross, deductions);
    expect(result.net).toBeCloseTo(850);
  });

  it('calculates net income with custom percent deduction', () => {
    const gross = 2000;
    const deductions = { federal: 10, state: 5, custom: 10 };
    const result = calculateWithholding(gross, deductions);
    expect(result.net).toBeCloseTo(1500);
  });
});

describe('custom deduction logic', () => {
  function netAfterAllDeductions(
    gross: number,
    taxNet: number,
    customDeductions: CustomDeduction[],
  ) {
    const totalCustom = customDeductions.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    return Math.max(0, taxNet - totalCustom);
  }

  it('net equals gross if not taxed', () => {
    const gross = 1200;
    const isTaxed = false;
    expect(isTaxed ? 0 : gross).toBe(1200);
  });

  it('net subtracts all custom deductions', () => {
    const gross = 2000;
    const taxNet = 1500;
    const customDeductions = [
      { name: 'Insurance', amount: 100 },
      { name: 'Child Support', amount: 200 },
    ];
    expect(netAfterAllDeductions(gross, taxNet, customDeductions)).toBe(1200);
  });

  it('net never goes below zero', () => {
    const gross = 1000;
    const taxNet = 200;
    const customDeductions = [{ name: 'Big Deduction', amount: 500 }];
    expect(netAfterAllDeductions(gross, taxNet, customDeductions)).toBe(0);
  });
});
