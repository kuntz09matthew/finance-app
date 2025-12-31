// MSW (Mock Service Worker) handler for /example endpoint
import { http } from 'msw';

export const handlers = [
  http.get('/api/example', ({ request, params, cookies }) => {
    return new Response(
      JSON.stringify({
        message: 'Mock API response',
        household: [
          { name: 'Alex', age: 34, relation: 'Self' },
          { name: 'Jamie', age: 32, relation: 'Spouse' },
          { name: 'Taylor', age: 5, relation: 'Child' },
        ],
        income: [
          { source: 'Alex - Salary', amount: 4200, frequency: 'monthly' },
          { source: 'Jamie - Part-time', amount: 800, frequency: 'monthly' },
        ],
        budget: {
          housing: 1200,
          utilities: 250,
          groceries: 600,
          transportation: 300,
          insurance: 200,
          entertainment: 150,
          savings: 400,
          other: 200,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }),
];
