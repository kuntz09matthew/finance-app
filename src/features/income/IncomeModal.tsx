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
import { IncomeSource } from './incomeSlice';

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
      ? `${initialData.source}-${initialData.expectedAmount}-${initialData.frequency}`
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
  const [expectedAmount, setExpectedAmount] = useState(
    initialData && typeof initialData.expectedAmount === 'number'
      ? initialData.expectedAmount.toString()
      : legacyAmount !== undefined
        ? legacyAmount.toString()
        : '',
  );
  const [actualAmount, setActualAmount] = useState(
    initialData && typeof initialData.actualAmount === 'number'
      ? initialData.actualAmount.toString()
      : legacyAmount !== undefined
        ? legacyAmount.toString()
        : '',
  );
  const [frequency, setFrequency] = useState<
    'weekly' | 'bi-weekly' | 'monthly' | 'annual' | 'one-time'
  >(initialData ? initialData.frequency : 'monthly');
  const [earner, setEarner] = useState(initialData ? initialData.earner : members[0] || '');
  const [type, setType] = useState(initialData ? initialData.type || 'Salary' : 'Salary');
  const [customType, setCustomType] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const finalType = type === 'Other' ? customType.trim() : type;
    if (
      !source.trim() ||
      !expectedAmount.trim() ||
      isNaN(Number(expectedAmount)) ||
      Number(expectedAmount) < 0 ||
      !actualAmount.trim() ||
      isNaN(Number(actualAmount)) ||
      Number(actualAmount) < 0 ||
      !earner ||
      !finalType
    ) {
      setError('Please enter valid source, expected, actual, earner, and type.');
      return;
    }
    onSave({
      source: source.trim(),
      expectedAmount: Number(expectedAmount),
      actualAmount: Number(actualAmount),
      frequency,
      earner,
      type: finalType,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type of income
        </label>
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
      <div className="bg-background text-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Income Source' : 'Add Income Source'}
        </h2>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type of income
          </label>
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
          <label className="block mb-1">Source</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Expected Amount ($)</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="number"
            min="0"
            value={expectedAmount}
            onChange={(e) => setExpectedAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Actual Amount ($)</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="number"
            min="0"
            value={actualAmount}
            onChange={(e) => setActualAmount(e.target.value)}
          />
        </div>
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
