import React from 'react';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r p-6 hidden md:block z-20"
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
          >
            {t('app.dashboard')}
          </Link>
        </li>
        <li>
          <Link
            href="/income"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
          >
            Income
          </Link>
        </li>
        <li>
          <Link
            href="/onboarding"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
          >
            {t('app.onboarding')}
          </Link>
        </li>
        <li>
          <Link
            href="/user/1"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
          >
            {t('app.user')}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
