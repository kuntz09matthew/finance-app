'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addIncomeSource, editIncomeSource, deleteIncomeSource, IncomeSource } from './incomeSlice';
import { IncomeModal } from './IncomeModal';
import { IncomeList } from './IncomeList';
import { v4 as uuidv4 } from 'uuid';

export function IncomeManager() {
  const sources = useSelector((state: RootState) => state.income.sources);
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Income Sources</h1>
        <button className="btn-primary" onClick={handleAdd}>
          Add Income
        </button>
      </div>
      <IncomeList sources={sources} onEdit={handleEdit} onDelete={handleDelete} />
      <IncomeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={
          initialData ? { ...initialData, amount: Number(initialData.amount) } : undefined
        }
      />
    </div>
  );
}
