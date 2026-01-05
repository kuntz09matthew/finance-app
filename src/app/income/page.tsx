'use client';
import React, { useState } from 'react';
import { IncomeManager } from '@/features/income/IncomeManager';
import { IncomeCharts } from '@/features/income/IncomeCharts';

const tabs = [
  { key: 'manage', label: 'Manage Income' },
  { key: 'charts', label: 'Charts' },
];

export default function IncomePage() {
  const [activeTab, setActiveTab] = useState('manage');

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="w-full max-w-5xl p-8 pl-12">
        <div className="mb-6 flex gap-4 border-b border-gray-300 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-semibold focus:outline-none border-b-2 transition-colors duration-150 ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-foreground hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab(tab.key)}
              aria-selected={activeTab === tab.key}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel">{activeTab === 'manage' ? <IncomeManager /> : <IncomeCharts />}</div>
      </div>
    </main>
  );
}
