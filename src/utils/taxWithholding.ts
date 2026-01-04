// Utility to calculate tax withholding for an income source
// Supports federal, state, and custom deductions

export interface TaxDeductions {
  federal: number; // percent, e.g. 12 for 12%
  state: number; // percent
  custom?: number; // percent, optional
}

export function calculateWithholding(
  gross: number,
  deductions: TaxDeductions,
): {
  federal: number;
  state: number;
  custom: number;
  total: number;
  net: number;
} {
  const federal = gross * (deductions.federal / 100);
  const state = gross * (deductions.state / 100);
  const custom = deductions.custom ? gross * (deductions.custom / 100) : 0;
  const total = federal + state + custom;
  const net = gross - total;
  return { federal, state, custom, total, net };
}
