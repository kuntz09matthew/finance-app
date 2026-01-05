import { RetirementManager } from '@/features/retirement/RetirementManager';
export function RetirementWidget() {
  return <RetirementManager />;
}
import React from 'react';
import { DashboardWidgetProps } from './DashboardWidget';

export function AccountBalancesWidget({ value }: { value: string }) {
  return <span className="text-2xl font-bold">{value}</span>;
}

export function IncomeWidget({ value }: { value: string }) {
  return <span className="text-2xl font-bold">{value}</span>;
}

export function ExpensesWidget({ value }: { value: string }) {
  return <span className="text-2xl font-bold">{value}</span>;
}

export function SavingsWidget({ value }: { value: string }) {
  return <span className="text-2xl font-bold">{value}</span>;
}

export function GoalsWidget({ value }: { value: string | number }) {
  return <span className="text-2xl font-bold">{value}</span>;
}

export { TaxBracketEstimatorWidget } from './TaxBracketEstimatorWidget';
