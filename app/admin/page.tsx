"use client";

import { motion } from 'motion/react';
import { Users, BrainCircuit, DollarSign, Activity, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Usuários Ativos', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Taxa de Acertos', value: '68%', change: '+2.5%', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Receita PRO', value: 'R$ 4.250', change: '+5%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Uso de IA (Prompts)', value: '45.2k', change: '-5%', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Visão Geral</h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Acompanhe o desempenho do Biblicando.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">{stat.name}</h3>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custo de IA Estimado */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-100 mb-6">Monitoramento de IA (Gemini)</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-gray-500 dark:text-gray-400">Cota Mensal Utilizada</span>
                <span className="text-gray-800 dark:text-gray-100">45%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#8B5CF6] h-3 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-4">
              Custo estimado atual: <strong className="text-gray-800 dark:text-gray-100">$12.40</strong>. Otimização de prompts está ativa.
            </p>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-100 mb-6">Atividade Recente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Novo usuário PRO assinou</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Há {i * 15} minutos</p>
                </div>
                <span className="text-[#58CC02] text-sm font-extrabold">+ R$ 29,90</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
