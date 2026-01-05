import React from 'react';
import { IncomeManager } from '@/features/income/IncomeManager';

export default function IncomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="w-full max-w-5xl p-8 pl-12">
        <IncomeManager />
      </div>
    </main>
  );
}
