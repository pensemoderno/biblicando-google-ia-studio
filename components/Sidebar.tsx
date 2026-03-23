"use client";

import { Home, Trophy, User, BookOpen, Settings, LogOut, Target } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sounds } from '@/lib/sounds';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Aprender', href: '/aprender' },
    { icon: Trophy, label: 'Ranking', href: '/ranking' },
    { icon: Target, label: 'Desafios', href: '/desafios' },
    { icon: User, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="p-6">
        <Link href="/aprender" onClick={() => sounds?.playClick()} className="flex items-center gap-3 text-[#1CB0F6] font-extrabold text-2xl tracking-tight">
          <BookOpen className="w-8 h-8" />
          Biblicando
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => sounds?.playClick()}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm lg:text-base transition-all ${
                isActive 
                  ? 'text-[#1CB0F6] bg-blue-50 dark:bg-blue-900/20 border-2 border-[#1CB0F6]/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-blue-100 dark:fill-blue-900/40' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/login"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm lg:text-base text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <LogOut className="w-6 h-6" />
          Sair
        </Link>
      </div>
    </aside>
  );
}
