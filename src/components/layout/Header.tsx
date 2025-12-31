import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 border-b sticky top-0 z-30 bg-background/95 backdrop-blur"
      style={{
        background: 'var(--header-background)',
        borderColor: 'var(--header-border)',
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:ring-2 focus:ring-blue-400"
        tabIndex={0}
      >
        Skip to main content
      </a>
      <div className="font-bold text-xl">{t('app.title')}</div>
      <nav className="flex items-center" role="navigation" aria-label="Main navigation">
        <a
          href="/dashboard"
          className="mx-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
        >
          {t('app.dashboard')}
        </a>
        <a
          href="/about"
          className="mx-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
        >
          {t('app.about')}
        </a>
        <ThemeSwitcher />
        <select
          aria-label={t('app.language')}
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="ml-4 px-2 py-1 rounded border focus:ring-2 focus:ring-blue-400 bg-inherit"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </nav>
    </header>
  );
};

export default Header;
