'use client';
import { ReactNode } from 'react';
import '../utils/i18n'; // ensure i18n is initialized
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
