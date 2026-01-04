import React, { useState } from 'react';
import { calculateWithholding, TaxDeductions } from '@/utils/taxWithholding';
import { CustomDeduction } from './incomeSlice';

interface TaxWithholdingCalculatorProps {
  gross: number;
  onNetChange?: (net: number) => void;
  customDeductions?: CustomDeduction[];
  onCustomDeductionsChange?: (deductions: CustomDeduction[]) => void;
}

export function TaxWithholdingCalculator({
  gross,
  onNetChange,
  customDeductions,
  onCustomDeductionsChange,
}: TaxWithholdingCalculatorProps) {
  const [deductions, setDeductions] = useState<TaxDeductions>({ federal: 12, state: 5, custom: 0 });
  // Local state for custom deduction fields (amount, not percent)
  const [localCustomDeductions, setLocalCustomDeductions] = useState<CustomDeduction[]>(
    customDeductions || [],
  );

  // Calculate tax-based deductions
  const { federal, state, custom, total, net: taxNet } = calculateWithholding(gross, deductions);
  // Calculate total custom deduction amount
  const customDeductionsTotal = localCustomDeductions.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0,
  );
  // Net after all deductions
  const net = Math.max(0, taxNet - customDeductionsTotal);

  React.useEffect(() => {
    if (onNetChange) onNetChange(net);
  }, [net, onNetChange]);

  // Handlers for custom deduction fields
  const handleCustomDeductionChange = (
    idx: number,
    field: 'name' | 'amount',
    value: string | number,
  ) => {
    const updated = localCustomDeductions.map((d, i) => (i === idx ? { ...d, [field]: value } : d));
    setLocalCustomDeductions(updated);
    if (onCustomDeductionsChange) onCustomDeductionsChange(updated);
  };
  const handleAddCustomDeduction = () => {
    const updated = [...localCustomDeductions, { name: '', amount: 0 }];
    setLocalCustomDeductions(updated);
    if (onCustomDeductionsChange) onCustomDeductionsChange(updated);
  };
  const handleRemoveCustomDeduction = (idx: number) => {
    const updated = localCustomDeductions.filter((_, i) => i !== idx);
    setLocalCustomDeductions(updated);
    if (onCustomDeductionsChange) onCustomDeductionsChange(updated);
  };

  return (
    <div className="space-y-2 bg-background text-foreground p-4 rounded shadow">
      <h3 className="font-semibold text-lg">Deductions Calculator</h3>
      <div className="flex gap-4 flex-wrap">
        <label>
          Federal (%)
          <input
            type="number"
            min={0}
            max={50}
            className="ml-2 border rounded px-2 py-1 w-16"
            value={deductions.federal}
            onChange={(e) => setDeductions((d) => ({ ...d, federal: Number(e.target.value) }))}
          />
        </label>
        <label>
          State (%)
          <input
            type="number"
            min={0}
            max={20}
            className="ml-2 border rounded px-2 py-1 w-16"
            value={deductions.state}
            onChange={(e) => setDeductions((d) => ({ ...d, state: Number(e.target.value) }))}
          />
        </label>
        <label>
          Custom (%)
          <input
            type="number"
            min={0}
            max={50}
            className="ml-2 border rounded px-2 py-1 w-16"
            value={deductions.custom || 0}
            onChange={(e) => setDeductions((d) => ({ ...d, custom: Number(e.target.value) }))}
          />
        </label>
      </div>
      <div className="mt-2 text-sm">
        <div>
          Gross:{' '}
          <span className="font-mono">
            ${gross.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          Federal:{' '}
          <span className="font-mono text-red-600">
            -${federal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          State:{' '}
          <span className="font-mono text-red-600">
            -${state.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        {deductions.custom ? (
          <div>
            Custom:{' '}
            <span className="font-mono text-red-600">
              -${custom.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        ) : null}
        <div className="font-semibold">
          Net after tax:{' '}
          <span className="font-mono text-green-700">
            ${taxNet.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-semibold mb-2">Other Deductions (amount, not percent)</div>
        {localCustomDeductions.map((ded, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              className="border rounded px-2 py-1 flex-1"
              type="text"
              placeholder="Deduction name (e.g. Insurance)"
              value={ded.name}
              onChange={(e) => handleCustomDeductionChange(idx, 'name', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-24"
              type="number"
              min="0"
              placeholder="Amount"
              value={ded.amount}
              onChange={(e) => handleCustomDeductionChange(idx, 'amount', Number(e.target.value))}
            />
            <button
              type="button"
              className="btn-secondary px-2"
              onClick={() => handleRemoveCustomDeduction(idx)}
              aria-label="Remove deduction"
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" className="btn-primary mt-2" onClick={handleAddCustomDeduction}>
          Add Deduction
        </button>
        {localCustomDeductions.length > 0 && (
          <div className="mt-2 text-sm text-muted">
            Total other deductions: ${customDeductionsTotal.toLocaleString()}
          </div>
        )}
      </div>
      <div className="mt-2 text-sm font-semibold">
        Net after all deductions:{' '}
        <span className="font-mono text-green-700">
          ${net.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
