'use client';

import { useTranslation } from 'react-i18next';

import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { AlertsList } from '@/components/alerts/AlertsList';
import { getDashboardAlerts } from '@/utils/dashboardAlerts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  setOrder,
  hideWidget,
  showWidget,
  WidgetId,
} from '@/features/dashboard/dashboardWidgetsSlice';
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import {
  AccountBalancesWidget,
  IncomeWidget,
  ExpensesWidget,
  SavingsWidget,
  GoalsWidget,
} from '@/components/dashboard/widgets';

export default function Dashboard() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useDashboardQuery();
  const dispatch = useDispatch();
  const widgetOrder = useSelector((state: RootState) => state.dashboardWidgets.order);
  const hiddenWidgets = useSelector((state: RootState) => state.dashboardWidgets.hidden);
  // Compose alerts data (mock: pass bills if available)
  const alerts = data ? getDashboardAlerts({ ...data, bills: data.bills || [] }) : [];

  // Widget map for rendering
  const widgetMap: Record<WidgetId, { title: string; node: React.ReactNode }> = {
    balances: {
      title: t('dashboard.balances', { defaultValue: 'Account Balances' }),
      node: data ? (
        <AccountBalancesWidget value={`$${data.summary.balances.toLocaleString('en-US')}`} />
      ) : null,
    },
    income: {
      title: t('dashboard.income', { defaultValue: 'Income' }),
      node: data ? (
        <IncomeWidget value={`$${data.summary.income.toLocaleString('en-US')}`} />
      ) : null,
    },
    expenses: {
      title: t('dashboard.expenses', { defaultValue: 'Expenses' }),
      node: data ? (
        <ExpensesWidget value={`$${data.summary.expenses.toLocaleString('en-US')}`} />
      ) : null,
    },
    savings: {
      title: t('dashboard.savings', { defaultValue: 'Savings' }),
      node: data ? (
        <SavingsWidget value={`$${data.summary.savings.toLocaleString('en-US')}`} />
      ) : null,
    },
    goals: {
      title: t('dashboard.goals', { defaultValue: 'Goals' }),
      node: data ? <GoalsWidget value={data.summary.goals} /> : null,
    },
  };

  // Drag-and-drop and settings UI (simple version)
  function handleRemove(id: WidgetId) {
    dispatch(hideWidget(id));
  }
  function handleShow(id: WidgetId) {
    dispatch(showWidget(id));
  }
  function handleMoveUp(idx: number) {
    if (idx === 0) return;
    const newOrder = [...widgetOrder];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    dispatch(setOrder(newOrder));
  }
  function handleMoveDown(idx: number) {
    if (idx === widgetOrder.length - 1) return;
    const newOrder = [...widgetOrder];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    dispatch(setOrder(newOrder));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-7xl px-4 sm:px-8 py-12 bg-background rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-foreground mb-4">
          {t('dashboard.title')}
        </h1>
        <p className="text-center text-foreground mb-8 text-lg">{t('dashboard.description')}</p>
        {isLoading ? (
          <div className="text-center text-foreground">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading dashboard.</div>
        ) : data ? (
          <>
            <AlertsList alerts={alerts} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12 w-full px-2 xl:px-0 min-w-0">
              {widgetOrder
                .filter((id) => !hiddenWidgets.includes(id))
                .map((id, idx) => (
                  <DashboardWidget key={id} id={id} title={widgetMap[id].title}>
                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                      <button
                        aria-label={t('dashboard.moveUp', { defaultValue: 'Move up' })}
                        className="p-1 rounded-full bg-muted hover:bg-accent shadow transition disabled:opacity-40"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        style={{ fontSize: 16 }}
                      >
                        <span aria-hidden="true">▲</span>
                      </button>
                      <button
                        aria-label={t('dashboard.moveDown', { defaultValue: 'Move down' })}
                        className="p-1 rounded-full bg-muted hover:bg-accent shadow transition disabled:opacity-40"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === widgetOrder.length - 1}
                        style={{ fontSize: 16 }}
                      >
                        <span aria-hidden="true">▼</span>
                      </button>
                      <button
                        aria-label={t('dashboard.removeWidget', { defaultValue: 'Remove widget' })}
                        className="p-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 shadow transition"
                        onClick={() => handleRemove(id)}
                        style={{ fontSize: 16 }}
                      >
                        <span aria-hidden="true">✕</span>
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[90px]">
                      {widgetMap[id].node}
                    </div>
                  </DashboardWidget>
                ))}
            </div>
            {/* Widget settings: show hidden widgets */}
            {hiddenWidgets.length > 0 && (
              <div className="mb-8">
                <h3 className="text-md font-semibold mb-2 text-foreground">
                  {t('dashboard.hiddenWidgets', { defaultValue: 'Hidden Widgets' })}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {hiddenWidgets.map((id) => (
                    <button
                      key={id}
                      className="px-3 py-1 rounded bg-muted hover:bg-accent text-xs"
                      onClick={() => handleShow(id)}
                    >
                      {widgetMap[id].title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <section className="w-full">
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                {t('dashboard.recentActivity', { defaultValue: 'Recent Activity' })}
              </h2>
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
                        {item.amount < 0 ? '-' : '+'}$
                        {Math.abs(item.amount).toLocaleString('en-US')}
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
}
