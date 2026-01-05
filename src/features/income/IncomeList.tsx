import React from 'react';
import { IncomeSource } from './incomeSlice';
import { getMonthlyEquivalent } from '@/utils/frequency';

interface IncomeListProps {
  sources: IncomeSource[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function IncomeList({ sources, onEdit, onDelete }: IncomeListProps) {
  const [detailsId, setDetailsId] = React.useState<string | null>(null);
  const selected = sources.find((s) => s.id === detailsId);
  if (!sources.length) {
    return <div className="text-center text-muted">No income sources added yet.</div>;
  }
  return (
    <>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setDetailsId(null)}
        >
          <div
            className="bg-background text-foreground rounded-lg shadow-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 btn-secondary px-2 py-1"
              onClick={() => setDetailsId(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2">Income Details</h2>
            <div className="space-y-2">
              <div>
                <b>Source:</b> {selected.source}
              </div>
              <div>
                <b>Type:</b> {selected.type}
              </div>
              <div>
                <b>Earner:</b> {selected.earner}
              </div>
              <div>
                <b>Gross Amount:</b> ${selected.grossAmount.toLocaleString()}
              </div>
              <div>
                <b>Net Amount:</b> ${selected.netAmount.toLocaleString()}
              </div>
              <div>
                <b>Variance:</b> ${(selected.netAmount - selected.grossAmount).toLocaleString()}
              </div>
              <div>
                <b>Taxed?</b> {selected.isTaxed ? 'Yes' : 'No'}
              </div>
              <div>
                <b>Other Deductions:</b>{' '}
                {selected.deductions && selected.deductions.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {selected.deductions.map((d, i) => (
                      <li key={i}>
                        {d.name}: ${d.amount.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'None'
                )}
              </div>
              <div>
                <b>Frequency:</b> {selected.frequency}
              </div>
              <div>
                <b>Date/Start:</b>{' '}
                {selected.frequency === 'one-time' ? selected.date : selected.startDate}
              </div>
              <div>
                <b>End Date:</b>{' '}
                {selected.frequency !== 'one-time' ? selected.endDate || 'Active' : 'N/A'}
              </div>
              <div>
                <b>Monthly Equivalent (Net):</b> $
                {getMonthlyEquivalent(selected.netAmount, selected.frequency).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <table className="w-full border rounded bg-background text-foreground">
        <thead>
          <tr>
            <th className="p-2 text-left">Source</th>
            <th className="p-2 text-left">Earner</th>
            <th className="p-2 text-left">Gross Amount</th>
            <th className="p-2 text-left">Net Amount</th>
            <th className="p-2 text-left">Frequency</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((inc) => (
            <tr key={inc.id} className="border-t">
              <td className="p-2">{inc.source}</td>
              <td className="p-2">{inc.earner}</td>
              <td className="p-2">${inc.grossAmount.toLocaleString()}</td>
              <td className="p-2">${inc.netAmount.toLocaleString()}</td>
              <td className="p-2 capitalize">{inc.frequency.replace('-', ' ')}</td>
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
                {/* Always render Stop Recurrence button for alignment, but hide if not applicable */}
                <button
                  className={`btn-warning px-2 py-1${inc.frequency !== 'one-time' && !inc.endDate ? '' : ' invisible'}`}
                  onClick={() => {
                    if (inc.frequency !== 'one-time' && !inc.endDate) {
                      const stopEvent = new CustomEvent('stopRecurrence', { detail: inc.id });
                      window.dispatchEvent(stopEvent);
                    }
                  }}
                  title="Stop Recurrence"
                  tabIndex={inc.frequency !== 'one-time' && !inc.endDate ? 0 : -1}
                  aria-hidden={inc.frequency === 'one-time' || !!inc.endDate}
                >
                  Stop Recurrence
                </button>
                <button
                  className="btn-info px-2 py-1"
                  onClick={() => setDetailsId(inc.id)}
                  title="View Details"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
