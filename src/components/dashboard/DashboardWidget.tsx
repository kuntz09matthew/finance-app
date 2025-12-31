import React from 'react';

export interface DashboardWidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function DashboardWidget({ id, title, children }: DashboardWidgetProps) {
  return (
    <section
      className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-950 border border-border/40 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-lg p-6 pt-10 min-w-[220px] max-w-[320px] min-h-[170px] flex flex-col gap-2 transition-all hover:scale-[1.025] hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400"
      aria-labelledby={`widget-title-${id}`}
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 id={`widget-title-${id}`} className="text-lg font-bold tracking-tight">
          {title}
        </h3>
      </div>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </section>
  );
}

export default DashboardWidget;
