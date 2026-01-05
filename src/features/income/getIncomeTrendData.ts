import { IncomeSource } from './incomeSlice';
import { getMonthlyEquivalent } from '@/utils/frequency';

// Returns an array of { month: 'YYYY-MM', [sourceName]: amount, ... }
export function getIncomeTrendData(
  sources: IncomeSource[],
  monthsBack: number = 12,
): { month: string; [source: string]: number | string }[] {
  // Get today and build a list of months (YYYY-MM) for the period
  const now = new Date();
  const months: string[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  // Get all unique sources
  const sourceNames = Array.from(new Set(sources.map((s) => s.source)));

  // Build data for each month
  const data = months.map((month) => {
    const row: { month: string; [source: string]: number | string } = { month };
    sourceNames.forEach((source) => {
      // Find all incomes for this source
      const incomes = sources.filter((s) => s.source === source);
      let total = 0;
      incomes.forEach((inc) => {
        // Determine if this income is active in this month
        let isActive = false;
        if (inc.frequency === 'one-time') {
          if (inc.date && inc.date.startsWith(month)) isActive = true;
        } else {
          // Recurring: check start/end
          const start = inc.startDate ? inc.startDate.slice(0, 7) : '';
          const end = inc.endDate ? inc.endDate.slice(0, 7) : '';
          if ((!start || start <= month) && (!end || end >= month)) {
            isActive = true;
          }
        }
        if (isActive) {
          // Use monthly equivalent for recurring, full for one-time
          if (inc.frequency === 'one-time') {
            total += inc.netAmount;
          } else {
            total += getMonthlyEquivalent(inc.netAmount, inc.frequency);
          }
        }
      });
      row[source] = Math.round(total * 100) / 100;
    });
    return row;
  });
  return data;
}
