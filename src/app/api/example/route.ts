import { NextResponse } from 'next/server';

const household = [
  { name: 'Alex', age: 34, relation: 'Self' },
  { name: 'Jamie', age: 32, relation: 'Spouse' },
  { name: 'Taylor', age: 5, relation: 'Child' },
];

const income = [
  { source: 'Alex - Salary', amount: 4200, frequency: 'monthly' },
  { source: 'Jamie - Part-time', amount: 800, frequency: 'monthly' },
];

const budget = {
  housing: 1200,
  utilities: 250,
  groceries: 600,
  transportation: 300,
  insurance: 200,
  entertainment: 150,
  savings: 400,
  other: 200,
};

export async function GET() {
  return NextResponse.json({ message: 'Mock API response', household, income, budget });
}
