"use client";

import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Download, WifiOff, Smartphone, Shield, Info } from 'lucide-react';
import Link from 'next/link';

export default function Configuracoes() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Check initial permission status
    if ('Notification' in window && Notification.permission === 'granted') {
      setPushEnabled(true);
    }
  }, []);

  const handlePushToggle = async () => {
    if (!pushEnabled) {
      if (!('Notification' in window)) {
        alert('Seu navegador não suporta notificações push.');
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushEnabled(true);
          new Notification('Biblicando', {
            body: 'Notificações ativadas com sucesso! Você receberá lembretes diários.',
            icon: '/icon.png' // Simulação de ícone
          });
        } else {
          alert('Permissão negada. Você precisa permitir as notificações nas configurações do seu navegador.');
          setPushEnabled(false);
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    } else {
      setPushEnabled(false);
      // Em um app real, aqui você desinscreveria o usuário do servidor de push (ex: Firebase Cloud Messaging)
    }
  };

  const handleDownloadLessons = () => {
    setDownloading(true);
    // Simula o download
    setTimeout(() => {
      setDownloading(false);
      setOfflineEnabled(true);
      alert('Lições baixadas com sucesso! Você pode acessá-las sem internet.');
    }, 2000);
  };

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[100dvh] md:pl-64 lg:pl-72">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-10 flex items-center gap-4">
          <Link href="/perfil" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-extrabold text-gray-800 dark:text-gray-100">Configurações</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-32 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-xl mx-auto space-y-8">
            
            {/* Notificações */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <Bell className="w-6 h-6 text-[#1CB0F6]" />
                <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-100">Notificações</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">Lembrete Diário</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Não perca sua ofensiva</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={pushEnabled}
                      onChange={handlePushToggle}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#58CC02]"></div>
                  </label>
                </div>
                
                {pushEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 flex gap-3"
                  >
                    <Info className="w-5 h-5 text-blue-500 shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                      As notificações push estão ativadas. Você receberá lembretes para manter sua ofensiva e novidades do app.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Modo Offline */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <WifiOff className="w-6 h-6 text-[#8B5CF6]" />
                <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-100">Modo Offline</h2>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Baixe as lições principais para continuar estudando mesmo sem internet. O progresso será sincronizado quando você se conectar novamente.
                </p>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-purple-500 shrink-0" />
                  <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">
                    Nota: Questões dissertativas que requerem avaliação da IA não estarão disponíveis no modo offline.
                  </p>
                </div>

                <button 
                  onClick={handleDownloadLessons}
                  disabled={downloading || offlineEnabled}
                  className={`w-full py-3 flex items-center justify-center gap-2 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all ${
                    offlineEnabled 
                      ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'
                      : downloading
                        ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/50 dark:text-blue-400 cursor-wait'
                        : 'bg-[#1CB0F6] hover:bg-[#1899D6] text-white shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px]'
                  }`}
                >
                  <Download className={`w-6 h-6 ${downloading ? 'animate-bounce' : ''}`} />
                  {offlineEnabled ? 'Lições Baixadas' : downloading ? 'Baixando...' : 'Baixar Lições (45MB)'}
                </button>
              </div>
            </div>

            {/* Conta */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-500" />
                <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-100">Privacidade e Conta</h2>
              </div>
              <div className="p-2">
                <button className="w-full p-4 text-left font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Termos de Serviço
                </button>
                <button className="w-full p-4 text-left font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Política de Privacidade
                </button>
                <button className="w-full p-4 text-left font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Excluir Conta
                </button>
              </div>
            </div>

          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
}

function AlertTriangle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
