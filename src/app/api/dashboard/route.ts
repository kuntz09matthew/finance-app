import { NextResponse } from 'next/server';

// Mock dashboard data (should match MSW mock for dev)
const dashboard = {
  summary: {
    balances: 5400,
    income: 5000,
    expenses: 2715,
    savings: 400,
    goals: 2,
  },
  recentActivity: [
    { type: 'income', description: 'Alex - Salary', amount: 4200, date: '2025-12-28' },
    { type: 'bill', description: 'Rent paid', amount: -1200, date: '2025-12-27' },
    { type: 'bill', description: 'Electric paid', amount: -90, date: '2025-12-20' },
    { type: 'income', description: 'Jamie - Part-time', amount: 800, date: '2025-12-15' },
  ],
};

export async function GET() {
  return NextResponse.json(dashboard);
}
