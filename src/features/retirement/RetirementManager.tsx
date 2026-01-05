'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  addAccount,
  updateAccount,
  removeAccount,
  RetirementAccount,
  RetirementAccountType,
} from './retirementSlice';
import { v4 as uuidv4 } from 'uuid';

const accountTypes: { value: RetirementAccountType; label: string }[] = [
  { value: '401k', label: '401k' },
  { value: 'IRA', label: 'IRA' },
  { value: 'Employer Match', label: 'Employer Match' },
  { value: 'Pension', label: 'Pension' },
  { value: 'Annuity', label: 'Annuity' },
];

export function RetirementManager() {
  const accounts = useSelector((state: RootState) => state.retirement.accounts);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<RetirementAccount>>({});

  function openAddModal() {
    setForm({});
    setEditId(null);
    setModalOpen(true);
  }

  function openEditModal(account: RetirementAccount) {
    setForm(account);
    setEditId(account.id);
    setModalOpen(true);
  }

  function handleSave() {
    if (
      !form.type ||
      !form.name ||
      !form.owner ||
      form.balance == null ||
      form.contribution == null ||
      form.target == null
    )
      return;
    const account: RetirementAccount = {
      id: editId || uuidv4(),
      type: form.type,
      name: form.name,
      owner: form.owner,
      balance: Number(form.balance),
      contribution: Number(form.contribution),
      target: Number(form.target),
      lastUpdated: new Date().toISOString(),
    };
    if (editId) {
      dispatch(updateAccount(account));
    } else {
      dispatch(addAccount(account));
    }
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    dispatch(removeAccount(id));
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Retirement Accounts</h2>
        <button className="btn-primary" onClick={openAddModal}>
          Add Account
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-background dark:bg-zinc-900 rounded-lg shadow p-4">
            <div className="font-semibold mb-1">{account.name}</div>
            <div className="text-sm text-muted-foreground mb-2">
              {account.type} ({account.owner})
            </div>
            <div className="mb-2">
              Balance: <span className="font-bold">${account.balance.toLocaleString()}</span>
            </div>
            <div className="mb-2">Contribution: ${account.contribution.toLocaleString()} / mo</div>
            <div className="mb-2">Target: ${account.target.toLocaleString()}</div>
            <div className="mb-2">
              Progress:{' '}
              <span className="font-bold">
                {((account.balance / account.target) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="btn-secondary" onClick={() => openEditModal(account)}>
                Edit
              </button>
              <button className="btn-danger" onClick={() => handleDelete(account.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="rounded-lg shadow-lg p-6 w-full max-w-md relative"
            style={{ background: 'var(--card-background)', color: 'var(--card-foreground)' }}
          >
            <button
              className="absolute top-2 right-2 btn-secondary px-2 py-1"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Account' : 'Add Account'}</h3>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div>
                <label className="block mb-1">Type</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  style={{ background: 'var(--card-background)', color: 'var(--card-foreground)' }}
                  value={form.type || ''}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value as RetirementAccountType }))
                  }
                >
                  <option value="">Select type</option>
                  {accountTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-1">Owner</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="text"
                  value={form.owner || ''}
                  onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-1">Balance ($)</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="number"
                  min="0"
                  value={form.balance ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, balance: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block mb-1">Monthly Contribution ($)</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="number"
                  min="0"
                  value={form.contribution ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, contribution: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block mb-1">Target ($)</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  type="number"
                  min="0"
                  value={form.target ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, target: Number(e.target.value) }))}
                />
              </div>
              <button className="btn-primary w-full mt-4" type="submit">
                {editId ? 'Save Changes' : 'Add Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
