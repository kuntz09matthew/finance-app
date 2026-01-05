'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addIncomeSource, editIncomeSource, deleteIncomeSource, IncomeSource } from './incomeSlice';

import { IncomeModal } from './IncomeModal';
import { IncomeList } from './IncomeList';
import { TaxWithholdingCalculator } from './TaxWithholdingCalculator';
import { v4 as uuidv4 } from 'uuid';

export function IncomeManager() {
  const sources = useSelector((state: RootState) => state.income.sources);
  // Try to get household members from onboarding or fallback to unique earners in sources, or fallback demo members
  // const onboarding = useSelector((state: RootState) => state.onboarding); // Uncomment and type RootState/onboarding if needed
  // Only show earners that actually have income sources, for accurate totals
  let householdMembers: string[] = Array.from(new Set(sources.map((s) => s.earner))).filter(
    Boolean,
  );
  // Fallback demo members if still empty
  if (!householdMembers.length) {
    householdMembers = ['Alex', 'Jamie', 'Taylor'];
  }
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Only load mock data after hydration (client-side)
  useEffect(() => {
    async function loadMockData() {
      try {
        const resp = await fetch('/testdata_income.json');
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data)) {
            dispatch({ type: 'income/setIncomeSources', payload: data });
          }
        }
      } catch (e) {
        console.warn('Failed to load mock income data:', e);
      }
    }
    loadMockData();
  }, [dispatch]);

  const handleAdd = () => {
    setEditId(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this income source?')) {
      dispatch(deleteIncomeSource(id));
    }
  };

  const handleSave = (data: Omit<IncomeSource, 'id'>) => {
    if (editId) {
      dispatch(editIncomeSource({ ...data, id: editId }));
    } else {
      dispatch(addIncomeSource({ ...data, id: uuidv4() }));
    }
    setModalOpen(false);
  };

  const initialData = editId ? sources.find((s) => s.id === editId) : undefined;

  // Calculate contribution stats
  const contributionStats = householdMembers.map((member) => {
    const total = sources
      .filter((s) => s.earner === member)
      .reduce((sum, s) => sum + (s.netAmount ?? 0), 0);
    return { member, total };
  });

  // Stop recurrence handler
  useEffect(() => {
    const stopHandler = (e: Event) => {
      const id = (e as CustomEvent).detail;
      const income = sources.find((s) => s.id === id);
      if (income && income.frequency !== 'one-time' && !income.endDate) {
        dispatch(editIncomeSource({ ...income, endDate: new Date().toISOString().slice(0, 10) }));
      }
    };
    window.addEventListener('stopRecurrence', stopHandler);
    return () => window.removeEventListener('stopRecurrence', stopHandler);
  }, [sources, dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Income Sources</h1>
        <button className="btn-primary" onClick={handleAdd}>
          Add Income
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Contribution by Earner</h2>
        <table className="w-full border rounded bg-background text-foreground">
          <thead>
            <tr>
              <th className="p-2 text-left">Earner</th>
              <th className="p-2 text-left">Total Income</th>
            </tr>
          </thead>
          <tbody>
            {contributionStats.map(({ member, total }, idx) => (
              <tr key={member || idx} className="border-t">
                <td className="p-2">{member}</td>
                <td className="p-2">${total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <IncomeList sources={sources} onEdit={handleEdit} onDelete={handleDelete} />
      {/* Tax Withholding Calculations section removed, now handled in modal only */}
      <IncomeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={initialData}
        householdMembers={householdMembers}
      />
    </div>
  );
}
