"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login de admin
    if (email === 'admin@biblicando.com' && password === 'admin') {
      router.push('/admin');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-950 flex flex-col transition-colors duration-300 relative">
      <header className="p-4 absolute top-0 left-0 w-full z-10">
        <Link href="/" className="inline-block p-2 text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-7 h-7" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4 border-2 border-gray-700">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Acesso Restrito</h1>
          <p className="text-gray-400 font-bold">Painel de Administração</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                placeholder="E-mail Admin" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-2xl py-3 pl-10 pr-3 text-sm font-bold text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-2xl py-3 pl-10 pr-3 text-sm font-bold text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4"
          >
            <button 
              type="submit"
              className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#991B1B] active:shadow-none active:translate-y-[4px] transition-all text-center"
            >
              Acessar Painel
            </button>
          </motion.div>
        </form>
        </div>
      </main>
    </div>
  );
}
