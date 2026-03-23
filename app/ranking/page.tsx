"use client";

import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function Ranking() {
  const leaderboard = [
    { name: "João Pedro", xp: 2450, isMe: false },
    { name: "Maria Silva", xp: 2310, isMe: false },
    { name: "Você", xp: 2150, isMe: true },
    { name: "Ana Souza", xp: 1980, isMe: false },
    { name: "Lucas Ferreira", xp: 1850, isMe: false },
  ];

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[100dvh] md:pl-64 lg:pl-72">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 pb-32 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-sm mx-auto space-y-8">
            
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors">Divisão Ouro</h1>
              <p className="text-gray-500 dark:text-gray-400 font-bold transition-colors">Os 3 primeiros avançam de divisão!</p>
            </div>

            <div className="flex justify-center">
              <Shield className="w-24 h-24 text-[#FFD900]" />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
              {leaderboard.map((user, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15 
                  }}
                  key={index}
                  className={`flex items-center p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-[#1CB0F6]/5 ${user.isMe ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                >
                  <div className="w-8 font-bold text-gray-400 dark:text-gray-500 text-lg">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-500 dark:text-gray-400 mr-4 transition-colors">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 font-bold text-gray-700 dark:text-gray-200 transition-colors">
                    {user.name}
                  </div>
                  <div className="font-extrabold text-[#1CB0F6]">
                    {user.xp} XP
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
}
