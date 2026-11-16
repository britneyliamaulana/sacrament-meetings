
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'All Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-6">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === '/meetings' &&
              pathname.startsWith('/meetings/') &&
              pathname !== '/meetings/current');

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? 'text-blue-950 border-b-2 border-blue-950 pb-1'
                  : 'text-gray-600 hover:text-blue-950'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
