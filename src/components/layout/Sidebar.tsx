import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => (
  <aside className="h-full w-64 bg-background border-r p-6 hidden md:block">
    <ul className="space-y-4">
      <li>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/onboarding" className="hover:underline">
          Onboarding
        </Link>
      </li>
      <li>
        <Link href="/user/1" className="hover:underline">
          Profile
        </Link>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
