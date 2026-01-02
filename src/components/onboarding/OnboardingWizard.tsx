'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  earner: string;
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
    { source: '', amount: '', frequency: 'monthly', earner: '' },
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
    <div aria-label="Onboarding Wizard" role="form">
      {step === 'household' && (
        <HouseholdStep onNext={next} household={household} setHousehold={setHousehold} />
      )}
      {step === 'income' && (
        <IncomeStep
          onNext={next}
          onBack={back}
          income={income}
          setIncome={setIncome}
          household={household}
        />
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
  const { t } = useTranslation();
  const handleChange = (idx: number, field: keyof HouseholdMember, value: string) => {
    setHousehold((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };
  const addMember = () => setHousehold((prev) => [...prev, { name: '', age: '', relation: '' }]);
  const removeMember = (idx: number) => setHousehold((prev) => prev.filter((_, i) => i !== idx));
  const canContinue = household.every((m) => m.name && m.age && m.relation);
  return (
    <div aria-label="Household Members Step" role="group">
      <h2 className="text-xl font-semibold mb-2">{t('onboarding.householdTitle')}</h2>
      <p className="mb-4">{t('onboarding.householdDesc')}</p>
      <div className="flex flex-col gap-4 mb-4">
        {household.map((member, idx) => (
          <div key={idx} className="flex gap-2 items-end">
            <label htmlFor={`member-name-${idx}`} className="sr-only">
              {t('onboarding.name')}
            </label>
            <input
              id={`member-name-${idx}`}
              className="border rounded px-2 py-1 w-32"
              placeholder={t('onboarding.name')}
              value={member.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
              aria-required="true"
            />
            <label htmlFor={`member-age-${idx}`} className="sr-only">
              {t('onboarding.age')}
            </label>
            <input
              id={`member-age-${idx}`}
              className="border rounded px-2 py-1 w-20"
              placeholder={t('onboarding.age')}
              type="number"
              min="0"
              value={member.age}
              onChange={(e) => handleChange(idx, 'age', e.target.value)}
              aria-required="true"
            />
            <label htmlFor={`member-relation-${idx}`} className="sr-only">
              {t('onboarding.relation')}
            </label>
            <input
              id={`member-relation-${idx}`}
              className="border rounded px-2 py-1 w-28"
              placeholder={t('onboarding.relation')}
              value={member.relation}
              onChange={(e) => handleChange(idx, 'relation', e.target.value)}
              aria-required="true"
            />
            {household.length > 1 && (
              <button
                className="btn-secondary"
                onClick={() => removeMember(idx)}
                title={t('onboarding.removeMember')}
                aria-label={`${t('onboarding.removeMember')} ${member.name || idx + 1}`}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          className="btn-secondary w-fit"
          onClick={addMember}
          aria-label={t('onboarding.addMember')}
        >
          {t('onboarding.addMember')}
        </button>
      </div>
      <button
        className="btn-primary"
        onClick={onNext}
        disabled={!canContinue}
        aria-label={t('onboarding.nextIncome')}
      >
        {t('onboarding.nextIncome')}
      </button>
    </div>
  );
}

interface IncomeStepProps {
  onNext: () => void;
  onBack: () => void;
  income: IncomeSource[];
  setIncome: React.Dispatch<React.SetStateAction<IncomeSource[]>>;
  household: HouseholdMember[];
}

function IncomeStep({ onNext, onBack, income, setIncome, household }: IncomeStepProps) {
  const { t } = useTranslation();
  const members = household.map((m) => m.name).filter(Boolean);
  const handleChange = (idx: number, field: keyof IncomeSource, value: string) => {
    setIncome((prev) => prev.map((i, n) => (n === idx ? { ...i, [field]: value } : i)));
  };
  const addIncome = () =>
    setIncome((prev) => [
      ...prev,
      { source: '', amount: '', frequency: 'monthly', earner: members[0] || '' },
    ]);
  const removeIncome = (idx: number) => setIncome((prev) => prev.filter((_, i) => i !== idx));
  const canContinue = income.every((i) => i.source && i.amount && i.frequency && i.earner);
  return (
    <div aria-label="Income Sources Step" role="group">
      <h2 className="text-xl font-semibold mb-2">{t('onboarding.incomeTitle')}</h2>
      <p className="mb-4">{t('onboarding.incomeDesc')}</p>
      <div className="flex flex-col gap-4 mb-4">
        {income.map((inc, idx) => (
          <div key={idx} className="flex gap-2 items-end">
            <label htmlFor={`income-source-${idx}`} className="sr-only">
              {t('onboarding.source')}
            </label>
            <input
              id={`income-source-${idx}`}
              className="border rounded px-2 py-1 w-32"
              placeholder={t('onboarding.source')}
              value={inc.source}
              onChange={(e) => handleChange(idx, 'source', e.target.value)}
              aria-required="true"
            />
            <label htmlFor={`income-amount-${idx}`} className="sr-only">
              {t('onboarding.amount')}
            </label>
            <input
              id={`income-amount-${idx}`}
              className="border rounded px-2 py-1 w-24"
              placeholder={t('onboarding.amount')}
              type="number"
              min="0"
              value={inc.amount}
              onChange={(e) => handleChange(idx, 'amount', e.target.value)}
              aria-required="true"
            />
            <label htmlFor={`income-frequency-${idx}`} className="sr-only">
              {t('onboarding.frequency')}
            </label>
            <select
              id={`income-frequency-${idx}`}
              className="border rounded px-2 py-1"
              value={inc.frequency}
              onChange={(e) => handleChange(idx, 'frequency', e.target.value)}
              aria-required="true"
            >
              <option value="monthly">{t('onboarding.frequency')}: Monthly</option>
              <option value="bi-weekly">{t('onboarding.frequency')}: Bi-weekly</option>
              <option value="weekly">{t('onboarding.frequency')}: Weekly</option>
              <option value="annual">{t('onboarding.frequency')}: Annual</option>
            </select>
            <label htmlFor={`income-earner-${idx}`} className="sr-only">
              Earner
            </label>
            <select
              id={`income-earner-${idx}`}
              className="border rounded px-2 py-1"
              value={inc.earner}
              onChange={(e) => handleChange(idx, 'earner', e.target.value)}
              aria-required="true"
            >
              <option value="">Select Earner</option>
              {members.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {income.length > 1 && (
              <button
                className="btn-secondary"
                onClick={() => removeIncome(idx)}
                title={t('onboarding.removeIncome')}
                aria-label={`${t('onboarding.removeIncome')} ${inc.source || idx + 1}`}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          className="btn-secondary w-fit"
          onClick={addIncome}
          aria-label={t('onboarding.addIncome')}
        >
          {t('onboarding.addIncome')}
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className="btn-secondary"
          onClick={onBack}
          aria-label={t('onboarding.backHousehold')}
        >
          {t('onboarding.backHousehold')}
        </button>
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canContinue}
          aria-label={t('onboarding.nextBudget')}
        >
          {t('onboarding.nextBudget')}
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
  const { t } = useTranslation();
  const handleChange = (field: keyof Budget, value: string) => {
    setBudget((prev) => ({ ...prev, [field]: value }));
  };
  const canContinue = Object.values(budget).every((v) => v !== '');
  return (
    <div aria-label="Budget Step" role="group">
      <h2 className="text-xl font-semibold mb-2">{t('onboarding.budgetTitle')}</h2>
      <p className="mb-4">{t('onboarding.budgetDesc')}</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(budget).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm mb-1 capitalize" htmlFor={key}>
              {t(`onboarding.${key}`)}
            </label>
            <input
              className="border rounded px-2 py-1"
              id={key}
              type="number"
              min="0"
              placeholder={t(`onboarding.${key}`)}
              value={String(value)}
              onChange={(e) => handleChange(key as keyof Budget, e.target.value)}
              aria-required="true"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="btn-secondary" onClick={onBack} aria-label={t('onboarding.backIncome')}>
          {t('onboarding.backIncome')}
        </button>
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canContinue}
          aria-label={t('onboarding.finish')}
        >
          {t('onboarding.finish')}
        </button>
      </div>
    </div>
  );
}

function CompleteStep({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return (
    <div aria-label="Onboarding Complete Step" role="group">
      <h2 className="text-xl font-semibold mb-2">{t('onboarding.completeTitle')}</h2>
      <p className="mb-4">{t('onboarding.completeDesc')}</p>
      {onBack && (
        <button className="btn-secondary" onClick={onBack} aria-label={t('onboarding.backBudget')}>
          {t('onboarding.backBudget')}
        </button>
      )}
    </div>
  );
}
