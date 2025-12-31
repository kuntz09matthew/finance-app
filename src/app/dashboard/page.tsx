'use client';

import { useTranslation } from 'react-i18next';
import { useExampleQuery } from '@/hooks/useExampleQuery';

export default function Dashboard() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useExampleQuery();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-3xl px-4 py-16 bg-background rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          {t('dashboard.title')}
        </h1>
        <p className="text-center text-foreground mb-8">{t('dashboard.description')}</p>
        <div className="flex flex-col gap-4 items-center">
          <span className="text-foreground">{t('dashboard.widgetsSoon')}</span>
          <div className="mt-4 w-full">
            <h2 className="text-xl font-semibold mb-2 text-foreground">React Query Example Data</h2>
            {isLoading && <div className="text-muted">Loading...</div>}
            {error && <div className="text-red-500">Error: {(error as Error).message}</div>}
            {data && (
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto text-foreground">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
