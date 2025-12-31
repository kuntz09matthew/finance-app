import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => (
  <aside
    className="h-full w-64 bg-background border-r p-6 hidden md:block"
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
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          href="/onboarding"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
        >
          Onboarding
        </Link>
      </li>
      <li>
        <Link
          href="/user/1"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
        >
          Profile
        </Link>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
