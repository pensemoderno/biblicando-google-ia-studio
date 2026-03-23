"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Activity, DollarSign, BrainCircuit, LogOut, LayoutDashboard, CreditCard, Bell } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Se for a página de login do admin, não mostra a sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Usuários', href: '/admin/usuarios', icon: Users },
    { name: 'Lições', href: '/admin/licoes', icon: Activity },
    { name: 'Planos', href: '/admin/planos', icon: CreditCard },
    { name: 'Notificações', href: '/admin/notificacoes', icon: Bell },
    { name: 'Métricas de IA', href: '/admin/ia', icon: BrainCircuit },
    { name: 'Assinaturas', href: '/admin/assinaturas', icon: DollarSign },
  ];

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-gray-950 flex transition-colors duration-300">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-[#1CB0F6] tracking-tight">Biblicando Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-[#1CB0F6]' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 text-[#FF4B4B] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-[#1CB0F6]">Admin</h1>
          <Link href="/" className="text-gray-500">
            <LogOut className="w-6 h-6" />
          </Link>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
