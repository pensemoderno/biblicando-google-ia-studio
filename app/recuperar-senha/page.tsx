"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Mail } from 'lucide-react';

export default function RecuperarSenha() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <header className="p-4">
        <Link href="/login" className="inline-block p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-7 h-7" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Recuperar Senha</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold">Enviaremos um link para você redefinir sua senha.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all mt-4"
          >
            Enviar Link
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-bold">
            Lembrou a senha?{' '}
            <Link href="/login" className="text-[#1CB0F6] uppercase tracking-wide hover:text-[#1899D6]">
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
