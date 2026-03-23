"use client";

import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { Tutorial } from '@/components/Tutorial';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BellRing, X } from 'lucide-react';
import Link from 'next/link';
import { sounds } from '@/lib/sounds';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useState } from 'react';

export default function Home() {
  const { permission, requestPermission } = usePushNotifications();
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(true);

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[100dvh] md:pl-64 lg:pl-72">
        <Tutorial />
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 pb-32 flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950 transition-colors duration-300 relative">
          
          <AnimatePresence>
            {permission === 'default' && showNotificationPrompt && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 shadow-xl z-10 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <BellRing className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-800 dark:text-gray-100 text-sm">Ative as Notificações</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 mb-3">
                    Não perca sua ofensiva! Receba lembretes diários para estudar.
                  </p>
                  <button
                    onClick={async () => {
                      await requestPermission();
                      setShowNotificationPrompt(false);
                    }}
                    className="px-4 py-2 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-[0_3px_0_#1899D6] active:shadow-none active:translate-y-[3px] transition-all"
                  >
                    Ativar Agora
                  </button>
                </div>
                <button 
                  onClick={() => setShowNotificationPrompt(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-sm space-y-10 text-center">
            
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors">
                Olá, Aprendiz! 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-lg transition-colors">
                Pronto para a sua lição diária?
              </p>
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative w-48 h-48 mx-auto bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center border-4 border-[#1CB0F6]/20 transition-colors duration-300"
            >
              <BookOpen className="w-24 h-24 text-[#1CB0F6]" />
              {/* Espaço para o futuro mascote do Biblicando */}
            </motion.div>

            <div className="pt-8">
              <motion.div
                whileHover={{ 
                  scale: [1, 1.04, 1],
                  transition: { 
                    repeat: Infinity, 
                    duration: 1.2,
                    ease: "easeInOut" 
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/licao" 
                  onClick={() => sounds?.playClick()}
                  className="block w-full py-3 px-8 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl font-extrabold text-lg uppercase tracking-wider shadow-[0_4px_0_#58A700] active:shadow-none active:translate-y-[4px] transition-all text-center"
                >
                  Começar Lição
                </Link>
              </motion.div>
            </div>
            
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
}
