import { Metadata } from 'next';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

export const metadata: Metadata = {
  title: 'Finance App | Onboarding',
  description: 'Step-by-step onboarding for your household financial setup.',
};

export default function Onboarding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-xl px-4 py-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          Onboarding Wizard
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-300 mb-8">
          Let’s get your household set up. This wizard will guide you through adding your household
          members, income sources, and initial budgets.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <OnboardingWizard />
        </div>
      </main>
    </div>
  );
}
