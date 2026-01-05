// Utility for estimating US federal tax bracket (2025)
// Source: IRS 2025 brackets (single, married filing jointly, head of household)

export type FilingStatus = 'single' | 'married' | 'head';

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const TAX_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 12400, rate: 0.1 },
    { min: 12401, max: 50400, rate: 0.12 },
    { min: 50401, max: 105700, rate: 0.22 },
    { min: 105701, max: 201775, rate: 0.24 },
    { min: 201776, max: 256225, rate: 0.32 },
    { min: 256226, max: 640600, rate: 0.35 },
    { min: 640601, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 24800, rate: 0.1 },
    { min: 24801, max: 100800, rate: 0.12 },
    { min: 100801, max: 211400, rate: 0.22 },
    { min: 211401, max: 403550, rate: 0.24 },
    { min: 403551, max: 512450, rate: 0.32 },
    { min: 512451, max: 768700, rate: 0.35 },
    { min: 768701, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 17700, rate: 0.1 },
    { min: 17701, max: 67450, rate: 0.12 },
    { min: 67451, max: 105700, rate: 0.22 },
    { min: 105701, max: 201750, rate: 0.24 },
    { min: 201751, max: 256200, rate: 0.32 },
    { min: 256201, max: 640600, rate: 0.35 },
    { min: 640601, max: Infinity, rate: 0.37 },
  ],
};

export function estimateTaxBracket(
  income: number,
  status: FilingStatus,
): { bracket: TaxBracket; index: number } | null {
  const brackets = TAX_BRACKETS[status];
  const idx = brackets.findIndex((b) => income >= b.min && income <= b.max);
  if (idx === -1) return null;
  return { bracket: brackets[idx], index: idx };
}
