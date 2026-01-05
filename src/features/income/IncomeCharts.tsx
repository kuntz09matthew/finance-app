import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IncomeTrendChart } from './IncomeTrendChart';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { getIncomeTrendData } from './getIncomeTrendData';
import { IncomeSource } from './incomeSlice';

// Utility to aggregate income by year
function getYearlyIncomeData(sources: IncomeSource[]): { year: string; total: number }[] {
  const yearTotals: Record<string, number> = {};
  sources.forEach((inc) => {
    let year = '';
    if (inc.frequency === 'one-time' && inc.date) {
      year = inc.date.slice(0, 4);
      yearTotals[year] = (yearTotals[year] || 0) + inc.netAmount;
    } else if (inc.startDate) {
      const startYear = parseInt(inc.startDate.slice(0, 4));
      const endYear = inc.endDate ? parseInt(inc.endDate.slice(0, 4)) : new Date().getFullYear();
      for (let y = startYear; y <= endYear; y++) {
        // Use monthly equivalent * 12 for each year
        yearTotals[y] =
          (yearTotals[y] || 0) + (inc.frequency !== 'one-time' ? inc.netAmount * 12 : 0);
      }
    }
  });
  return Object.entries(yearTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, total]) => ({ year, total: Math.round(total * 100) / 100 }));
}

export function IncomeCharts() {
  const sources = useSelector((state: RootState) => state.income.sources);

  const trendData = getIncomeTrendData(sources, 12);
  const sourceNames = Array.from(new Set(sources.map((s) => s.source)));
  const yearlyData = getYearlyIncomeData(sources);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Income Trend (Last 12 Months)</h2>
        <IncomeTrendChart data={trendData} sources={sourceNames} chartType="line" />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Year-over-Year Income Comparison</h2>
        <div className="w-full h-80 bg-background text-foreground rounded shadow p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value ?? 0).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="total" fill="#2563eb" name="Total Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
