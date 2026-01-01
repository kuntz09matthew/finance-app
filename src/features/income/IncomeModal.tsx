import React, { useState, useEffect } from 'react';
import { IncomeSource } from './incomeSlice';

interface IncomeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (income: Omit<IncomeSource, 'id'>) => void;
  initialData?: Omit<IncomeSource, 'id'>;
}

const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
];

export function IncomeModal({ open, onClose, onSave, initialData }: IncomeModalProps) {
  // Use a key to force remount and reset state when modal opens or initialData changes
  const modalKey = open
    ? initialData
      ? `${initialData.source}-${initialData.amount}-${initialData.frequency}`
      : 'new'
    : 'closed';
  if (!open) return null;
  return (
    <ModalContent key={modalKey} onClose={onClose} onSave={onSave} initialData={initialData} />
  );
}

function ModalContent({
  onClose,
  onSave,
  initialData,
}: {
  onClose: () => void;
  onSave: (income: Omit<IncomeSource, 'id'>) => void;
  initialData?: Omit<IncomeSource, 'id'>;
}) {
  const [source, setSource] = useState(initialData ? initialData.source : '');
  const [amount, setAmount] = useState(initialData ? initialData.amount.toString() : '');
  const [frequency, setFrequency] = useState<'weekly' | 'bi-weekly' | 'monthly' | 'annual'>(
    initialData ? initialData.frequency : 'monthly',
  );
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!source.trim() || !amount.trim() || isNaN(Number(amount)) || Number(amount) < 0) {
      setError('Please enter a valid source and amount.');
      return;
    }
    onSave({ source: source.trim(), amount: Number(amount), frequency });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-background text-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Income Source' : 'Add Income Source'}
        </h2>
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
          <label className="block mb-1">Amount ($)</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Frequency</label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value as 'weekly' | 'bi-weekly' | 'monthly' | 'annual')
            }
          >
            {frequencies.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
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
