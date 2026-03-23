"use client";

import { motion } from 'motion/react';
import { BrainCircuit, Zap, AlertTriangle, TrendingUp, Sparkles, DollarSign } from 'lucide-react';

export default function AdminIA() {
  const metrics = [
    { name: 'Prompts Gerados (Mês)', value: '45.2k', limit: '100k', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { name: 'Custo Estimado', value: '$12.40', limit: '$50.00', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Tempo Médio de Resposta', value: '1.2s', limit: '2.0s', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: 'Erros de Geração', value: '0.5%', limit: '2.0%', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Métricas de IA</h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Monitore o uso, custos e performance do agente Gemini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bg}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">{metric.name}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{metric.value}</p>
                <span className="text-sm font-medium text-gray-400 dark:text-gray-500">/ {metric.limit}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uso por Tipo de Questão */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            Uso por Tipo de Questão
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-gray-600 dark:text-gray-300">Múltipla Escolha</span>
                <span className="text-gray-800 dark:text-gray-100">60%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#1CB0F6] h-3 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-gray-600 dark:text-gray-300">Dissertativas (Correção)</span>
                <span className="text-gray-800 dark:text-gray-100">25%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#8B5CF6] h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-gray-600 dark:text-gray-300">Completar Lacunas</span>
                <span className="text-gray-800 dark:text-gray-100">15%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-[#58CC02] h-3 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas e Recomendações */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Otimização
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl">
              <p className="font-bold text-green-800 dark:text-green-400 text-sm">
                Status: Saudável
              </p>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1 font-medium">
                O uso de tokens está dentro do limite esperado para o número de usuários ativos.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl">
              <p className="font-bold text-yellow-800 dark:text-yellow-400 text-sm">
                Recomendação
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1 font-medium">
                Considere implementar cache para questões de múltipla escolha mais frequentes para reduzir custos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
