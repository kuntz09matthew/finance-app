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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('incomeSources');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'income/setIncomeSources', payload: parsed });
        }
      } catch {}
    }
  }, [dispatch]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('incomeSources', JSON.stringify(sources));
  }, [sources]);

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
