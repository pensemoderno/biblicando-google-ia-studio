"use client";

import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Target, Star, Award, Gift, Lock, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function Desafios() {
  const dailyChallenges = [
    { id: 1, title: 'Complete 3 lições', progress: 2, total: 3, xp: 50, completed: false },
    { id: 2, title: 'Acerte 10 questões seguidas', progress: 10, total: 10, xp: 100, completed: true },
    { id: 3, title: 'Ganhe 200 XP', progress: 150, total: 200, xp: 50, completed: false },
  ];

  const achievements = [
    { id: 1, title: 'Sábio Iniciante', desc: 'Complete sua primeira lição', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100', unlocked: true },
    { id: 2, title: 'Em Chamas', desc: 'Alcance 7 dias de ofensiva', icon: Target, color: 'text-orange-500', bg: 'bg-orange-100', unlocked: true },
    { id: 3, title: 'Mestre da Palavra', desc: 'Acerte 50 questões dissertativas', icon: Award, color: 'text-purple-500', bg: 'bg-purple-100', unlocked: false },
    { id: 4, title: 'Colecionador', desc: 'Desbloqueie 10 conquistas', icon: Gift, color: 'text-blue-500', bg: 'bg-blue-100', unlocked: false },
  ];

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[100dvh] md:pl-64 lg:pl-72 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 max-w-3xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Desafios e Conquistas</h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold">Complete missões para ganhar mais XP!</p>
          </div>

          {/* Desafios Diários */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Target className="w-6 h-6 text-[#1CB0F6]" />
                Missões Diárias
              </h2>
              <div className="flex items-center gap-1 text-sm font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                14h 23m
              </div>
            </div>

            <div className="space-y-4">
              {dailyChallenges.map((challenge, index) => (
                <motion.div 
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-4 ${
                    challenge.completed 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' 
                      : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    challenge.completed ? 'bg-[#58CC02] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {challenge.completed ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-extrabold ${challenge.completed ? 'text-green-800 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
                      {challenge.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          className={`h-full rounded-full ${challenge.completed ? 'bg-[#58CC02]' : 'bg-[#1CB0F6]'}`}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400 min-w-[40px]">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-center">
                    <div className="text-[#FFD900] font-extrabold flex items-center gap-1">
                      <Zap className="w-4 h-4 fill-current" />
                      {challenge.xp}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conquistas */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#FFD900]" />
              Conquistas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achieve, index) => {
                const Icon = achieve.icon;
                return (
                  <motion.div 
                    key={achieve.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-2xl border-2 flex items-start gap-4 ${
                      achieve.unlocked 
                        ? 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700' 
                        : 'bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      achieve.unlocked ? achieve.bg : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {achieve.unlocked ? (
                        <Icon className={`w-6 h-6 ${achieve.color}`} />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-800 dark:text-gray-100">{achieve.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1 leading-snug">
                        {achieve.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </main>
        <BottomNav />
      </div>
    </>
  );
}
