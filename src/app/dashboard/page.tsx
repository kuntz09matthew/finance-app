'use client';

import { useTranslation } from 'react-i18next';

import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { AlertsList } from '@/components/alerts/AlertsList';
import { getDashboardAlerts } from '@/utils/dashboardAlerts';

export default function Dashboard() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useDashboardQuery();
  // Compose alerts data (mock: pass bills if available)
  const alerts = data ? getDashboardAlerts({ ...data, bills: data.bills || [] }) : [];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-3xl px-4 py-16 bg-background rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          {t('dashboard.title')}
        </h1>
        <p className="text-center text-foreground mb-8">{t('dashboard.description')}</p>
        {isLoading ? (
          <div className="text-center text-foreground">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading dashboard.</div>
        ) : data ? (
          <>
            <AlertsList alerts={alerts} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
              <DashboardCard
                label="Account Balances"
                value={`$${data.summary.balances.toLocaleString()}`}
              />
              <DashboardCard label="Income" value={`$${data.summary.income.toLocaleString()}`} />
              <DashboardCard
                label="Expenses"
                value={`$${data.summary.expenses.toLocaleString()}`}
              />
              <DashboardCard label="Savings" value={`$${data.summary.savings.toLocaleString()}`} />
              <DashboardCard label="Goals" value={data.summary.goals} />
            </div>
            <section className="w-full">
              <h2 className="text-xl font-semibold mb-2 text-foreground">Recent Activity</h2>
              <ul className="divide-y divide-border rounded-lg bg-card-background shadow">
                {data.recentActivity.map(
                  (item: { description: string; date: string; amount: number }, idx: number) => (
                    <li key={idx} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <span className="block font-medium text-foreground">
                          {item.description}
                        </span>
                        <span className="block text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <span
                        className={`font-mono ${item.amount < 0 ? 'text-red-500' : 'text-green-600'}`}
                      >
                        {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toLocaleString()}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
  // DashboardCard component for summary cards
  function DashboardCard({ label, value }: { label: string; value: string | number }) {
    return (
      <div className="flex flex-col items-center justify-center bg-card-background text-card-foreground rounded-lg shadow p-4 min-w-[120px]">
        <span className="text-sm text-muted-foreground mb-1">{label}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    );
  }
}
