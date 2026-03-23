"use client";

import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Settings, Zap, Flame, Crown, LogOut, Target, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Perfil() {
  const { user, profile } = useAuth();

  const accuracyData = [
    { type: 'Múltipla Escolha', percentage: 85, color: 'bg-blue-500' },
    { type: 'Dissertativas', percentage: 60, color: 'bg-purple-500' },
    { type: 'Completar Lacunas', percentage: 92, color: 'bg-green-500' },
  ];

  const history = [
    { id: 1, title: 'A Criação do Mundo', date: 'Hoje', score: '100%' },
    { id: 2, title: 'A Arca de Noé', date: 'Ontem', score: '80%' },
    { id: 3, title: 'Os 10 Mandamentos', date: 'Há 2 dias', score: '95%' },
  ];

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[100dvh] md:pl-64 lg:pl-72">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 pb-32 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-xl mx-auto space-y-8">
            
            {/* Header do Perfil */}
            <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#1CB0F6] flex items-center justify-center text-3xl font-bold text-white shadow-md">
                {profile?.displayName?.charAt(0).toUpperCase() || 'V'}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors">{profile?.displayName || 'Você'}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-bold transition-colors">Aprendiz Dedicado</p>
                {profile?.plan === 'pro' && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    <Award className="w-4 h-4" />
                    Biblicando PRO
                  </div>
                )}
              </div>
              <Link href="/configuracoes" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Settings className="w-6 h-6" />
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors">Estatísticas</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 flex items-center gap-3 transition-colors duration-300">
                  <Flame className="w-8 h-8 text-[#FF9600]" />
                  <div>
                    <div className="font-extrabold text-xl text-gray-800 dark:text-gray-100 transition-colors">12</div>
                    <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase transition-colors">Ofensiva</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 flex items-center gap-3 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-[#FFD900]" />
                  <div>
                    <div className="font-extrabold text-xl text-gray-800 dark:text-gray-100 transition-colors">2150</div>
                    <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase transition-colors">XP Total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Precisão por Tipo de Questão */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-[#1CB0F6]" />
                Taxa de Acertos
              </h3>
              <div className="space-y-6">
                {accuracyData.map((data, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-gray-600 dark:text-gray-300">{data.type}</span>
                      <span className="text-gray-800 dark:text-gray-100">{data.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${data.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Histórico de Lições */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#58CC02]" />
                Histórico Recente
              </h3>
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-extrabold">
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 text-[#1CB0F6] font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                Ver Histórico Completo
              </button>
            </div>

            {/* Banner PRO */}
            {profile?.plan !== 'pro' && (
              <Link href="/pro">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden cursor-pointer"
                >
                  <Crown className="absolute -right-4 -top-4 w-24 h-24 text-white opacity-20 rotate-12" />
                  <h3 className="text-xl font-extrabold mb-2">Biblicando Pro</h3>
                  <p className="font-medium text-white/90 mb-4 text-sm">Vidas infinitas e análises de IA para acelerar seu aprendizado!</p>
                  <button className="bg-white text-[#8B5CF6] px-4 py-2 rounded-xl font-extrabold text-sm uppercase tracking-wider w-full shadow-sm">
                    Ver Planos
                  </button>
                </motion.div>
              </Link>
            )}

            {/* Sair */}
            <Link 
              href="/login" 
              className="w-full py-3 flex items-center justify-center gap-2 text-[#FF4B4B] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              SAIR DA CONTA
            </Link>

          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
}
