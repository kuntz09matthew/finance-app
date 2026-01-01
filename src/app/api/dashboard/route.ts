import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  // Load mock income data from testdata_income.json
  const incomePath = path.join(process.cwd(), 'src/assets/testdata_income.json');
  let incomeData: Array<{ id: string; source: string; amount: number; frequency: string }> = [];
  try {
    const file = await fs.readFile(incomePath, 'utf-8');
    incomeData = JSON.parse(file);
  } catch {
    // fallback to empty
  }
  const totalIncome = incomeData.reduce(
    (sum: number, i) => sum + (typeof i.amount === 'number' ? i.amount : Number(i.amount) || 0),
    0,
  );

  // Use static values for other fields for now
  const dashboard = {
    summary: {
      balances: -50,
      income: totalIncome,
      expenses: 5000,
      savings: 400,
      goals: 1,
    },
    recentActivity: [
      ...incomeData.map((i) => ({
        type: 'income',
        description: i.source,
        amount: i.amount,
        date: '2025-12-28',
      })),
      { type: 'bill', description: 'Rent paid', amount: -1200, date: '2025-12-27' },
      { type: 'bill', description: 'Electric paid', amount: -90, date: '2025-12-20' },
    ],
    bills: [
      {
        id: 1,
        name: 'Rent',
        category: 'Housing',
        amount: 1200,
        dueDate: '2025-12-30',
        recurring: true,
        autoPay: true,
      },
      {
        id: 2,
        name: 'Electric',
        category: 'Utilities',
        amount: 90,
        dueDate: '2026-01-02',
        recurring: true,
        autoPay: false,
      },
      {
        id: 3,
        name: 'Internet',
        category: 'Utilities',
        amount: 60,
        dueDate: '2026-01-15',
        recurring: true,
        autoPay: true,
      },
      {
        id: 4,
        name: 'Car Insurance',
        category: 'Insurance',
        amount: 100,
        dueDate: '2026-01-20',
        recurring: true,
        autoPay: false,
      },
      {
        id: 5,
        name: 'Streaming',
        category: 'Entertainment',
        amount: 15,
        dueDate: '2026-01-25',
        recurring: true,
        autoPay: true,
      },
    ],
  };
  return NextResponse.json(dashboard);
}
