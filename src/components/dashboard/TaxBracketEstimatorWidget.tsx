import React, { useState } from 'react';
import { estimateTaxBracket, TAX_BRACKETS, FilingStatus } from '@/utils/taxBracketEstimator';

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'head', label: 'Head of Household' },
];

export function TaxBracketEstimatorWidget() {
  const [income, setIncome] = useState('60000');
  const [status, setStatus] = useState<FilingStatus>('single');

  const parsedIncome = Number(income.replace(/[^\d.]/g, ''));
  const result = estimateTaxBracket(parsedIncome, status);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <h2 className="text-lg font-bold">Tax Bracket Estimator</h2>
      <div className="flex gap-4 items-center">
        <label htmlFor="income" className="font-medium">
          Annual Income ($)
        </label>
        <input
          id="income"
          type="number"
          min="0"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="input input-bordered w-32"
        />
        <label htmlFor="status" className="font-medium">
          Filing Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as FilingStatus)}
          className="input input-bordered"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {result ? (
        <div className="mt-2 p-3 rounded bg-zinc-100 border border-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
          <div>
            <span className="font-semibold">Estimated Bracket:</span> $
            {result.bracket.min.toLocaleString()} - $
            {result.bracket.max === Infinity ? 'and up' : result.bracket.max.toLocaleString()} @{' '}
            {(result.bracket.rate * 100).toFixed(0)}%
          </div>
          <div>
            <span className="font-semibold">Marginal Rate:</span>{' '}
            {(result.bracket.rate * 100).toFixed(0)}%
          </div>
        </div>
      ) : (
        <div className="mt-2 text-red-500">Income not in bracket range.</div>
      )}
      <div className="text-xs text-muted-foreground mt-2">
        2026 US Federal brackets. For informational purposes only.
      </div>

      {/* Collapsible info section */}
      <details className="mt-2 text-sm">
        <summary className="cursor-pointer font-semibold text-blue-700 dark:text-blue-300">
          What do these results mean?
        </summary>
        <div className="mt-2 space-y-2">
          <div>
            <span className="font-bold">Estimated Bracket:</span> This shows the income range and
            tax rate for your filing status. Only the portion of your income within this range is
            taxed at the shown rate.
          </div>
          <div>
            <span className="font-bold">Marginal Rate:</span> The tax rate applied to your last
            dollar of income. It does not mean all your income is taxed at this rate.
          </div>
          <div>
            <span className="font-bold">How brackets work:</span> The US uses a progressive tax
            system. Your income is divided into chunks, each taxed at a different rate. Your
            effective tax rate (average) is lower than your marginal rate.
          </div>
          <div>
            <span className="font-bold">Note:</span> This estimator does not account for deductions,
            credits, or state taxes. Actual tax owed may differ.
          </div>
        </div>
      </details>
    </div>
  );
}
