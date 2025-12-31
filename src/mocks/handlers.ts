// MSW (Mock Service Worker) handler for /example endpoint
import { http } from 'msw';

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

const bills = [
  {
    id: 1,
    name: 'Rent',
    category: 'Housing',
    amount: 1200,
    dueDate: '2025-01-01',
    recurring: true,
    autoPay: true,
  },
  {
    id: 2,
    name: 'Electric',
    category: 'Utilities',
    amount: 90,
    dueDate: '2025-01-10',
    recurring: true,
    autoPay: false,
  },
  {
    id: 3,
    name: 'Internet',
    category: 'Utilities',
    amount: 60,
    dueDate: '2025-01-15',
    recurring: true,
    autoPay: true,
  },
  {
    id: 4,
    name: 'Car Insurance',
    category: 'Insurance',
    amount: 100,
    dueDate: '2025-01-20',
    recurring: true,
    autoPay: false,
  },
  {
    id: 5,
    name: 'Streaming',
    category: 'Entertainment',
    amount: 15,
    dueDate: '2025-01-25',
    recurring: true,
    autoPay: true,
  },
];

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

export const handlers = [
  // Example endpoint
  http.get('/api/example', () => {
    return new Response(
      JSON.stringify({ message: 'Mock API response', household, income, budget }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }),

  // Onboarding endpoint
  http.get('/api/onboarding', () => {
    return new Response(JSON.stringify({ household, income, budget }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // Income endpoint
  http.get('/api/income', () => {
    return new Response(JSON.stringify({ income }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // Bills endpoint
  http.get('/api/bills', () => {
    return new Response(JSON.stringify({ bills }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // Dashboard endpoint
  http.get('/api/dashboard', () => {
    return new Response(JSON.stringify(dashboard), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
