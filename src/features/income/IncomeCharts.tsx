import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IncomeTrendChart } from './IncomeTrendChart';
import { getIncomeTrendData } from './getIncomeTrendData';

export function IncomeCharts() {
  const sources = useSelector((state: RootState) => state.income.sources);
  const trendData = getIncomeTrendData(sources, 12);
  const sourceNames = Array.from(new Set(sources.map((s) => s.source)));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Income Trend (Last 12 Months)</h2>
        <IncomeTrendChart data={trendData} sources={sourceNames} chartType="line" />
      </div>
      {/* Future charts can be added here as new sections */}
    </section>
  );
}
