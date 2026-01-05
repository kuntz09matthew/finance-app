import React from 'react';
import { RetirementManager } from '@/features/retirement/RetirementManager';

export default function RetirementPage() {
  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-12 bg-background rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-foreground mb-6">Retirement Accounts</h1>
      <RetirementManager />
    </main>
  );
}
