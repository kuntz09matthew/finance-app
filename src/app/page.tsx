import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance App | Home',
  description: 'Personal finance dashboard and tools for households.',
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main
        className="w-full max-w-2xl px-4 py-16 rounded-lg shadow-md border"
        style={{
          background: 'var(--card-background)',
          color: 'var(--card-foreground)',
          borderColor: '#e5e7eb',
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Your Financial Assistant</h1>
        <p className="text-lg text-center mb-8">
          Track your income, expenses, savings, and goals—all in one place. Start by adding your
          household details and financial accounts.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <a
            href="/onboarding"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
