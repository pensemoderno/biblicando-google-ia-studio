"use client";

import { Home, Trophy, User, Target } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sounds } from '@/lib/sounds';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Início', href: '/aprender' },
    { icon: Trophy, label: 'Ranking', href: '/ranking' },
    { icon: Target, label: 'Desafios', href: '/desafios' },
    { icon: User, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-50 transition-colors duration-300">
      <ul className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                onClick={() => sounds?.playClick()}
                className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-colors ${
                  isActive 
                    ? 'text-[#1CB0F6] bg-blue-50/50 dark:bg-blue-900/20' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-7 h-7 mb-1 ${isActive ? 'fill-blue-100 dark:fill-blue-900/40' : ''}`} />
                <span className="text-xs font-bold tracking-wide">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
