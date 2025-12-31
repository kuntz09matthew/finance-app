'use client';
import { useTranslation } from 'react-i18next';

export default function HomeClient() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-4">{t('app.welcome')}</h1>
      <div className="flex flex-col gap-4 items-center">
        <a
          href="/onboarding"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {t('app.onboarding')}
        </a>
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors"
        >
          {t('app.dashboard')}
        </a>
      </div>
    </>
  );
}
