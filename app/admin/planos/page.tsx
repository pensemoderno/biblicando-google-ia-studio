"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit2, Trash2, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  pagarmePlanId: string;
  status: 'active' | 'inactive';
  subscribers: number;
}

const mockPlans: Plan[] = [
  { id: '1', name: 'Biblicando Pro - Mensal', price: 19.90, interval: 'monthly', pagarmePlanId: 'plan_12345', status: 'active', subscribers: 1250 },
  { id: '2', name: 'Biblicando Pro - Anual', price: 199.00, interval: 'yearly', pagarmePlanId: 'plan_67890', status: 'active', subscribers: 3400 },
];

export default function AdminPlanos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState<Plan[]>(mockPlans);

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Gerenciar Planos</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Crie e configure os planos de assinatura vinculados ao Pagar.me.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar plano..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium focus:outline-none focus:border-[#1CB0F6] transition-colors w-full sm:w-64"
            />
          </div>
          <Link 
            href="/admin/planos/novo"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-extrabold uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Plano
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Nome do Plano</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Preço</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">ID Pagar.me</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Assinantes</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan, index) => (
                <motion.tr 
                  key={plan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{plan.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Cobrança {plan.interval === 'monthly' ? 'Mensal' : 'Anual'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="p-4 font-mono text-sm text-gray-500 dark:text-gray-400">
                    {plan.pagarmePlanId}
                  </td>
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                    {plan.subscribers.toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      plan.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {plan.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#1CB0F6] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {filteredPlans.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Nenhum plano encontrado.
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
