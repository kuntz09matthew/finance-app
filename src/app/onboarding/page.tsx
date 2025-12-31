'use client';
import { Metadata } from 'next';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { useTranslation } from 'react-i18next';

export default function Onboarding() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-xl px-4 py-16 bg-background rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          {t('onboarding.wizardTitle')}
        </h1>
        <p className="text-center text-foreground mb-8">{t('onboarding.wizardDesc')}</p>
        <div className="flex flex-col gap-4 items-center">
          <OnboardingWizard />
        </div>
      </main>
    </div>
  );
}
