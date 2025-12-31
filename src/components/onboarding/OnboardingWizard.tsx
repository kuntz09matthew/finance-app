'use client';
import React, { useState } from 'react';

export type OnboardingStep = 'household' | 'income' | 'budget' | 'complete';

export interface HouseholdMember {
  name: string;
  age: string;
  relation: string;
}

export interface IncomeSource {
  source: string;
  amount: string;
  frequency: string;
}

export interface Budget {
  housing: string;
  utilities: string;
  groceries: string;
  transportation: string;
  insurance: string;
  entertainment: string;
  savings: string;
  other: string;
}

export function OnboardingWizard() {
  const [step, setStep] = useState<OnboardingStep>('household');
  const [household, setHousehold] = useState<HouseholdMember[]>([
    { name: '', age: '', relation: '' },
  ]);
  const [income, setIncome] = useState<IncomeSource[]>([
    { source: '', amount: '', frequency: 'monthly' },
  ]);
  const [budget, setBudget] = useState<Budget>({
    housing: '',
    utilities: '',
    groceries: '',
    transportation: '',
    insurance: '',
    entertainment: '',
    savings: '',
    other: '',
  });

  const next = () => {
    setStep((prev) => {
      if (prev === 'household') return 'income';
      if (prev === 'income') return 'budget';
      if (prev === 'budget') return 'complete';
      return prev;
    });
  };

  const back = () => {
    setStep((prev) => {
      if (prev === 'income') return 'household';
      if (prev === 'budget') return 'income';
      if (prev === 'complete') return 'budget';
      return prev;
    });
  };

  return (
    <div>
      {step === 'household' && (
        <HouseholdStep onNext={next} household={household} setHousehold={setHousehold} />
      )}
      {step === 'income' && (
        <IncomeStep onNext={next} onBack={back} income={income} setIncome={setIncome} />
      )}
      {step === 'budget' && (
        <BudgetStep onNext={next} onBack={back} budget={budget} setBudget={setBudget} />
      )}
      {step === 'complete' && <CompleteStep onBack={back} />}
    </div>
  );
}

interface HouseholdStepProps {
  onNext: () => void;
  household: HouseholdMember[];
  setHousehold: React.Dispatch<React.SetStateAction<HouseholdMember[]>>;
}

function HouseholdStep({ onNext, household, setHousehold }: HouseholdStepProps) {
  const handleChange = (idx: number, field: keyof HouseholdMember, value: string) => {
    setHousehold((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };
  const addMember = () => setHousehold((prev) => [...prev, { name: '', age: '', relation: '' }]);
  const removeMember = (idx: number) => setHousehold((prev) => prev.filter((_, i) => i !== idx));
  const canContinue = household.every((m) => m.name && m.age && m.relation);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Household Members</h2>
      <p className="mb-4">Add your household members to get started.</p>
      <div className="flex flex-col gap-4 mb-4">
        {household.map((member, idx) => (
          <div key={idx} className="flex gap-2 items-end">
            <input
              className="border rounded px-2 py-1 w-32"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-20"
              placeholder="Age"
              type="number"
              min="0"
              value={member.age}
              onChange={(e) => handleChange(idx, 'age', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-28"
              placeholder="Relation"
              value={member.relation}
              onChange={(e) => handleChange(idx, 'relation', e.target.value)}
            />
            {household.length > 1 && (
              <button className="btn-secondary" onClick={() => removeMember(idx)} title="Remove">
                -
              </button>
            )}
          </div>
        ))}
        <button className="btn-secondary w-fit" onClick={addMember}>
          + Add Member
        </button>
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!canContinue}>
        Next: Income
      </button>
    </div>
  );
}

interface IncomeStepProps {
  onNext: () => void;
  onBack: () => void;
  income: IncomeSource[];
  setIncome: React.Dispatch<React.SetStateAction<IncomeSource[]>>;
}

function IncomeStep({ onNext, onBack, income, setIncome }: IncomeStepProps) {
  const handleChange = (idx: number, field: keyof IncomeSource, value: string) => {
    setIncome((prev) => prev.map((i, n) => (n === idx ? { ...i, [field]: value } : i)));
  };
  const addIncome = () =>
    setIncome((prev) => [...prev, { source: '', amount: '', frequency: 'monthly' }]);
  const removeIncome = (idx: number) => setIncome((prev) => prev.filter((_, i) => i !== idx));
  const canContinue = income.every((i) => i.source && i.amount && i.frequency);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Income Sources</h2>
      <p className="mb-4">Add your income sources (salary, side jobs, etc.).</p>
      <div className="flex flex-col gap-4 mb-4">
        {income.map((inc, idx) => (
          <div key={idx} className="flex gap-2 items-end">
            <input
              className="border rounded px-2 py-1 w-32"
              placeholder="Source"
              value={inc.source}
              onChange={(e) => handleChange(idx, 'source', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-24"
              placeholder="Amount"
              type="number"
              min="0"
              value={inc.amount}
              onChange={(e) => handleChange(idx, 'amount', e.target.value)}
            />
            <select
              className="border rounded px-2 py-1"
              value={inc.frequency}
              onChange={(e) => handleChange(idx, 'frequency', e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
              <option value="annual">Annual</option>
            </select>
            {income.length > 1 && (
              <button className="btn-secondary" onClick={() => removeIncome(idx)} title="Remove">
                -
              </button>
            )}
          </div>
        ))}
        <button className="btn-secondary w-fit" onClick={addIncome}>
          + Add Income
        </button>
      </div>
      <div className="flex gap-2">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-primary" onClick={onNext} disabled={!canContinue}>
          Next: Budget
        </button>
      </div>
    </div>
  );
}

interface BudgetStepProps {
  onNext: () => void;
  onBack: () => void;
  budget: Budget;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>;
}

function BudgetStep({ onNext, onBack, budget, setBudget }: BudgetStepProps) {
  const handleChange = (field: keyof Budget, value: string) => {
    setBudget((prev) => ({ ...prev, [field]: value }));
  };
  const canContinue = Object.values(budget).every((v) => v !== '');
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Initial Budget</h2>
      <p className="mb-4">Set up your initial monthly budget.</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(budget).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm mb-1 capitalize" htmlFor={key}>
              {key}
            </label>
            <input
              className="border rounded px-2 py-1"
              id={key}
              type="number"
              min="0"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={String(value)}
              onChange={(e) => handleChange(key as keyof Budget, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-primary" onClick={onNext} disabled={!canContinue}>
          Finish
        </button>
      </div>
    </div>
  );
}

function CompleteStep({ onBack }: { onBack?: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">All Set!</h2>
      <p className="mb-4">
        Your household is ready. You can now use the dashboard and other features.
      </p>
      {onBack && (
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
      )}
    </div>
  );
}
