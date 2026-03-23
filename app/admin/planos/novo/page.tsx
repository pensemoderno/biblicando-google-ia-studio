"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Plus, Trash2, CreditCard, Info } from 'lucide-react';
import Link from 'next/link';

export default function AdminNovoPlano() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [pagarmePlanId, setPagarmePlanId] = useState('');
  const [features, setFeatures] = useState<string[]>(['Vidas infinitas', 'Sem anúncios']);

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Aqui integraria com o backend para salvar o plano no banco de dados
    // e possivelmente sincronizar com a API do Pagar.me
    alert('Plano salvo com sucesso! (Simulação)');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4">
        <Link href="/admin/planos" className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Novo Plano</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">Crie um novo plano de assinatura e vincule ao Pagar.me.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
        
        {/* Integração Pagar.me Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-400 text-sm">Integração com Pagar.me</p>
            <p className="text-sm text-blue-700 dark:text-blue-500 mt-1 font-medium">
              Para que o checkout funcione corretamente, você deve primeiro criar o plano no Dashboard do Pagar.me e inserir o <strong>ID do Plano (plan_xxxx)</strong> no campo abaixo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nome do Plano (Exibição)</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Biblicando Pro - Mensal"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID do Plano (Pagar.me)</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={pagarmePlanId}
                onChange={(e) => setPagarmePlanId(e.target.value)}
                placeholder="Ex: plan_123456789"
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 font-mono text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Preço (R$)</label>
            <input 
              type="number" 
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 19.90"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Ciclo de Cobrança</label>
            <select 
              value={interval}
              onChange={(e) => setInterval(e.target.value as 'monthly' | 'yearly')}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors appearance-none"
            >
              <option value="monthly">Mensal</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Benefícios do Plano (Features)</label>
            <button 
              onClick={addFeature}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-[#1CB0F6] rounded-lg font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
          
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white bg-[#58CC02] shrink-0">
                  ✓
                </div>
                <input 
                  type="text" 
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Ex: Acesso a todas as lições"
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-2 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
                />
                <button 
                  onClick={() => removeFeature(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            {features.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Nenhum benefício adicionado.</p>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex justify-end gap-4 z-10">
        <Link 
          href="/admin/planos"
          className="px-6 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-bold uppercase tracking-wider transition-colors"
        >
          Cancelar
        </Link>
        <button 
          onClick={handleSave}
          disabled={!name || !price || !pagarmePlanId}
          className="flex items-center gap-2 px-8 py-3 bg-[#58CC02] hover:bg-[#46A302] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-extrabold uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all"
        >
          <Save className="w-5 h-5" />
          Salvar Plano
        </button>
      </div>
    </div>
  );
}
