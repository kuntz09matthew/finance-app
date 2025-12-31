import React from 'react';

export type AlertType = 'spending' | 'bill' | 'goal' | 'overdraft';
export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface Alert {
  id: number;
  type: AlertType;
  message: string;
  severity: AlertSeverity;
  date: string;
}

const severityColors: Record<AlertSeverity, string> = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function AlertsList({ alerts }: { alerts: Alert[] }) {
  if (!alerts.length) return null;
  return (
    <section className="mb-8" aria-label="Alerts and Warnings">
      <h2 className="text-xl font-semibold mb-2 text-foreground">Alerts & Warnings</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`rounded-lg px-4 py-3 shadow flex items-center gap-3 ${severityColors[alert.severity]}`}
            role="alert"
            aria-live={alert.severity === 'critical' ? 'assertive' : 'polite'}
          >
            <span className="font-bold capitalize">{alert.type}</span>
            <span className="flex-1">{alert.message}</span>
            <span className="text-xs opacity-70">{alert.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
