import React from 'react';
import { IncomeManager } from '@/features/income/IncomeManager';

export default function IncomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-2xl p-6">
        <IncomeManager />
      </div>
    </main>
  );
}
