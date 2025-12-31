'use client';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-3xl px-4 py-16 bg-background rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          {t('dashboard.title')}
        </h1>
        <p className="text-center text-foreground mb-8">{t('dashboard.description')}</p>
        <div className="flex flex-col gap-4 items-center">
          <span className="text-foreground">{t('dashboard.widgetsSoon')}</span>
        </div>
      </main>
    </div>
  );
}
