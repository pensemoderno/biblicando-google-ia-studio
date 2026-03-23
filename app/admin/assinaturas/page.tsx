"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Download, TrendingUp, DollarSign, Calendar, CheckCircle2, XCircle } from 'lucide-react';

interface Subscription {
  id: string;
  user: string;
  email: string;
  plan: 'pro' | 'free';
  status: 'active' | 'canceled' | 'past_due';
  amount: number;
  nextBilling: string;
}

const mockSubscriptions: Subscription[] = [
  { id: 'sub_1', user: 'João Silva', email: 'joao@example.com', plan: 'pro', status: 'active', amount: 29.90, nextBilling: '10/12/2023' },
  { id: 'sub_2', user: 'Ana Oliveira', email: 'ana@example.com', plan: 'pro', status: 'active', amount: 29.90, nextBilling: '01/12/2023' },
  { id: 'sub_3', user: 'Carlos Mendes', email: 'carlos@example.com', plan: 'pro', status: 'canceled', amount: 29.90, nextBilling: '-' },
  { id: 'sub_4', user: 'Fernanda Lima', email: 'fernanda@example.com', plan: 'pro', status: 'past_due', amount: 29.90, nextBilling: '05/11/2023' },
];

export default function AdminAssinaturas() {
  const [filter, setFilter] = useState<'all' | 'active' | 'canceled'>('all');

  const filteredSubs = mockSubscriptions.filter(sub => {
    if (filter === 'active') return sub.status === 'active';
    if (filter === 'canceled') return sub.status === 'canceled' || sub.status === 'past_due';
    return true;
  });

  const totalRevenue = mockSubscriptions
    .filter(s => s.status === 'active')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Assinaturas e Receita</h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Gerencie os planos Biblicando Pro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-500">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receita Mensal (MRR)</p>
            <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
              R$ {totalRevenue.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-500">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assinantes Ativos</p>
            <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
              {mockSubscriptions.filter(s => s.status === 'active').length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-500">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Taxa de Cancelamento</p>
            <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
              {((mockSubscriptions.filter(s => s.status === 'canceled').length / mockSubscriptions.length) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${filter === 'all' ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${filter === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              Ativas
            </button>
            <button 
              onClick={() => setFilter('canceled')}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${filter === 'canceled' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              Canceladas/Atrasadas
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#1CB0F6] bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Cliente</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Valor</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Próxima Cobrança</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub, index) => (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">{sub.user}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{sub.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      sub.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      sub.status === 'canceled' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {sub.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                      {sub.status === 'canceled' && <XCircle className="w-3 h-3" />}
                      {sub.status === 'past_due' && <CreditCard className="w-3 h-3" />}
                      {sub.status === 'active' ? 'Ativa' : sub.status === 'canceled' ? 'Cancelada' : 'Atrasada'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                    R$ {sub.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {sub.nextBilling}
                  </td>
                </motion.tr>
              ))}
              
              {filteredSubs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Nenhuma assinatura encontrada para este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
