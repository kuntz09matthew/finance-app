import React from 'react';
import { IncomeSource } from './incomeSlice';
import { getMonthlyEquivalent } from '@/utils/frequency';

interface IncomeListProps {
  sources: IncomeSource[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function IncomeList({ sources, onEdit, onDelete }: IncomeListProps) {
  if (!sources.length) {
    return <div className="text-center text-muted">No income sources added yet.</div>;
  }
  return (
    <table className="w-full border rounded bg-background text-foreground">
      <thead>
        <tr>
          <th className="p-2 text-left">Source</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Earner</th>
          <th className="p-2 text-left">Gross Amount</th>
          <th className="p-2 text-left">Net Amount</th>
          <th className="p-2 text-left">
            Variance
            <span
              tabIndex={0}
              className="ml-1 cursor-help text-xs text-gray-500 border-b border-dotted border-gray-400"
              title="Variance = Net Amount - Gross Amount. Shows the total deductions (taxes + other) for this income."
              aria-label="Variance info"
            >
              ⓘ
            </span>
          </th>
          <th className="p-2 text-left">Taxed?</th>
          <th className="p-2 text-left">Other Deductions</th>
          <th className="p-2 text-left">Frequency</th>
          <th className="p-2 text-left">Monthly Equivalent (Net)</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sources.map((inc) => {
          const monthly = getMonthlyEquivalent(inc.netAmount, inc.frequency);
          const variance = inc.netAmount - inc.grossAmount;
          return (
            <tr key={inc.id} className="border-t">
              <td className="p-2">{inc.source}</td>
              <td className="p-2">{inc.type || ''}</td>
              <td className="p-2">{inc.earner}</td>
              <td className="p-2">${inc.grossAmount.toLocaleString()}</td>
              <td className="p-2">${inc.netAmount.toLocaleString()}</td>
              <td
                className={
                  variance === 0 ? 'p-2' : variance > 0 ? 'p-2 text-green-600' : 'p-2 text-red-600'
                }
              >
                {variance === 0
                  ? '$0'
                  : (variance > 0 ? '+' : '') + '$' + variance.toLocaleString()}
              </td>
              <td className="p-2">{inc.isTaxed ? 'Yes' : 'No'}</td>
              <td className="p-2">
                {inc.deductions && inc.deductions.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {inc.deductions.map((d, i) => (
                      <li key={i}>
                        {d.name}: ${d.amount.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">None</span>
                )}
              </td>
              <td className="p-2 capitalize">{inc.frequency.replace('-', ' ')}</td>
              <td className="p-2">
                ${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  className="btn-secondary px-2 py-1"
                  onClick={() => onEdit(inc.id)}
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  className="btn-danger px-2 py-1"
                  onClick={() => onDelete(inc.id)}
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
