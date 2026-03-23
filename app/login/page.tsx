"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    await signInWithGoogle();
    router.push('/aprender');
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300 relative">
      <header className="p-4 absolute top-0 left-0 w-full z-10">
        <Link href="/" className="inline-block p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-7 h-7" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 sm:border-2 sm:border-gray-200 dark:sm:border-gray-800 sm:rounded-3xl sm:shadow-xl p-6 sm:p-8">
          <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Entrar</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold">Que bom ver você de novo!</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl py-3 pl-10 pr-3 text-sm font-bold text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#1CB0F6] dark:focus:border-[#1CB0F6] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Senha" 
                className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl py-3 pl-10 pr-3 text-sm font-bold text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#1CB0F6] dark:focus:border-[#1CB0F6] transition-colors"
              />
            </div>
            <div className="text-right mt-2">
              <Link href="/recuperar-senha" className="text-sm font-bold text-[#1CB0F6] hover:text-[#1899D6] transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all mt-4 disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-gray-400 font-bold uppercase text-sm">Ou</span>
          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <motion.button
          type="button"
          onClick={() => handleLogin()}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 mt-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#E5E7EB] dark:shadow-[0_4px_0_#1F2937] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Entrar com Google
        </motion.button>

          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-bold">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-[#1CB0F6] uppercase tracking-wide hover:text-[#1899D6]">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
