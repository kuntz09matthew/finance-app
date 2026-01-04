'use client';
const incomeTypes = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Gift', label: 'Gift' },
  { value: 'Bonus', label: 'Bonus' },
  { value: 'Other', label: 'Other' },
];
import React, { useState, useEffect } from 'react';

// For legacy support: type with optional amount
type LegacyIncome = {
  amount?: number;
};
import { IncomeSource, CustomDeduction } from './incomeSlice';
import { TaxWithholdingCalculator } from './TaxWithholdingCalculator';

interface IncomeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (income: Omit<IncomeSource, 'id'>) => void;
  initialData?: Omit<IncomeSource, 'id'>;
  householdMembers: string[];
}
const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
  { value: 'one-time', label: 'One-time' },
];

export function IncomeModal({
  open,
  onClose,
  onSave,
  initialData,
  householdMembers,
}: IncomeModalProps) {
  // Use a key to force remount and reset state when modal opens or initialData changes
  const modalKey = open
    ? initialData
      ? `${initialData.source}-${initialData.grossAmount}-${initialData.frequency}`
      : 'new'
    : 'closed';
  if (!open) return null;
  return (
    <ModalContent
      key={modalKey}
      onClose={onClose}
      onSave={onSave}
      initialData={initialData}
      householdMembers={householdMembers}
    />
  );
}
function ModalContent({
  onClose,
  onSave,
  initialData,
  householdMembers,
}: {
  onClose: () => void;
  onSave: (income: Omit<IncomeSource, 'id'>) => void;
  initialData?: Omit<IncomeSource, 'id'>;
  householdMembers: string[];
}) {
  // Fallback demo members for testing if none provided
  const fallbackMembers = ['Alex', 'Jamie', 'Taylor'];
  const members =
    householdMembers && householdMembers.length > 0 ? householdMembers : fallbackMembers;
  const [source, setSource] = useState(initialData ? initialData.source : '');
  // Support legacy 'amount' property for backward compatibility
  const legacyAmount =
    initialData && typeof (initialData as LegacyIncome).amount === 'number'
      ? (initialData as LegacyIncome).amount
      : undefined;
  const [grossAmount, setGrossAmount] = useState<number>(
    initialData?.grossAmount ?? legacyAmount ?? 0,
  );
  const [netAmount, setNetAmount] = useState<number>(initialData?.netAmount ?? legacyAmount ?? 0);
  const [isTaxed, setIsTaxed] = useState<boolean>(initialData?.isTaxed ?? true);
  const [deductions, setDeductions] = useState<CustomDeduction[]>(initialData?.deductions ?? []);
  const [taxNet, setTaxNet] = useState<number>(grossAmount);
  const [frequency, setFrequency] = useState<
    'weekly' | 'bi-weekly' | 'monthly' | 'annual' | 'one-time'
  >(initialData ? initialData.frequency : 'monthly');
  const [earner, setEarner] = useState(initialData ? initialData.earner : members[0] || '');
  const [type, setType] = useState(initialData ? initialData.type || 'Salary' : 'Salary');
  const [customType, setCustomType] = useState('');
  const [error, setError] = useState('');
  const [showTaxCalc, setShowTaxCalc] = useState(false);

  const handleSave = () => {
    const finalType = type === 'Other' ? customType.trim() : type;
    if (
      !source.trim() ||
      isNaN(Number(grossAmount)) ||
      Number(grossAmount) < 0 ||
      isNaN(Number(netAmount)) ||
      Number(netAmount) < 0 ||
      !earner
    ) {
      setError('Please enter valid source, gross amount, net amount, and earner.');
      return;
    }
    onSave({
      source: source.trim(),
      grossAmount,
      netAmount,
      frequency,
      earner,
      type: finalType,
      isTaxed,
      deductions,
    });
    onClose();
  };

  // Calculate total custom deductions
  const customDeductionsTotal = deductions.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  // Update net amount when gross, isTaxed, taxNet, or deductions change
  React.useEffect(() => {
    if (!isTaxed) {
      setNetAmount(grossAmount);
    } else {
      setNetAmount(Math.max(0, taxNet - customDeductionsTotal));
    }
  }, [grossAmount, isTaxed, taxNet, customDeductionsTotal]);

  // Handler for updating a deduction
  const handleDeductionChange = (idx: number, field: 'name' | 'amount', value: string | number) => {
    setDeductions((prev) => prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d)));
  };
  // Handler for adding a deduction
  const handleAddDeduction = () => {
    setDeductions((prev) => [...prev, { name: '', amount: 0 }]);
  };
  // Handler for removing a deduction
  const handleRemoveDeduction = (idx: number) => {
    setDeductions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      {showTaxCalc && isTaxed && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-background text-foreground rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 btn-secondary px-2 py-1"
              onClick={() => setShowTaxCalc(false)}
              aria-label="Close tax calculator"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Deductions Calculator</h2>
            <TaxWithholdingCalculator
              gross={Number(grossAmount) || 0}
              onNetChange={setTaxNet}
              customDeductions={deductions}
              onCustomDeductionsChange={setDeductions}
            />
          </div>
        </div>
      )}
      <div className="bg-background text-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Income Source' : 'Add Income Source'}
        </h2>
        <div className="mb-4 flex items-center">
          <input
            id="isTaxed"
            type="checkbox"
            className="mr-2"
            checked={isTaxed}
            onChange={(e) => setIsTaxed(e.target.checked)}
          />
          <label htmlFor="isTaxed">This income is taxed (calculate deductions)</label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Source</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Type of income</label>
          <select
            id="type"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>
          {type === 'Other' && (
            <input
              id="customType"
              type="text"
              placeholder="Enter custom type"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gross Amount ($)</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="number"
            min="0"
            value={grossAmount}
            onChange={(e) => setGrossAmount(Number(e.target.value))}
          />
          {isTaxed && (
            <button
              type="button"
              className="btn-secondary ml-2 whitespace-nowrap"
              onClick={() => setShowTaxCalc(true)}
              aria-label="Open deductions calculator"
            >
              Open Deductions Calculator
            </button>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Net Amount ($)</label>
          <input
            className="border rounded px-2 py-1 w-full bg-gray-100"
            type="number"
            min="0"
            value={netAmount}
            readOnly
          />
        </div>

        {isTaxed && (
          <div className="mb-4">
            <label className="block mb-1">Other Deductions</label>
            {deductions.map((ded, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  className="border rounded px-2 py-1 flex-1"
                  type="text"
                  placeholder="Deduction name (e.g. Insurance)"
                  value={ded.name}
                  onChange={(e) => handleDeductionChange(idx, 'name', e.target.value)}
                />
                <input
                  className="border rounded px-2 py-1 w-24"
                  type="number"
                  min="0"
                  placeholder="Amount"
                  value={ded.amount}
                  onChange={(e) => handleDeductionChange(idx, 'amount', Number(e.target.value))}
                />
                <button
                  type="button"
                  className="btn-secondary px-2"
                  onClick={() => handleRemoveDeduction(idx)}
                  aria-label="Remove deduction"
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="btn-primary mt-2" onClick={handleAddDeduction}>
              Add Deduction
            </button>
            {deductions.length > 0 && (
              <div className="mt-2 text-sm text-muted">
                Total other deductions: ${customDeductionsTotal.toLocaleString()}
              </div>
            )}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Frequency</label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={frequency}
            onChange={(e) =>
              setFrequency(
                e.target.value as 'weekly' | 'bi-weekly' | 'monthly' | 'annual' | 'one-time',
              )
            }
          >
            {frequencies.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Earner</label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={earner}
            onChange={(e) => setEarner(e.target.value)}
          >
            {members.map((member, idx) => (
              <option key={member || idx} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-2">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            {initialData ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
