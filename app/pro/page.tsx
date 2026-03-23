"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Crown, Zap, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

// Simulação dos planos que viriam do banco de dados (cadastrados no painel admin)
const plans = [
  {
    id: 'plan_12345',
    name: 'Biblicando Pro Mensal',
    price: 19.90,
    interval: 'mês',
    features: ['Vidas infinitas', 'Sem anúncios', 'Feedback de IA ilimitado', 'Estatísticas avançadas'],
    popular: false,
  },
  {
    id: 'plan_67890',
    name: 'Biblicando Pro Anual',
    price: 199.00,
    interval: 'ano',
    features: ['Vidas infinitas', 'Sem anúncios', 'Feedback de IA ilimitado', 'Estatísticas avançadas', 'Desconto de 16%'],
    popular: true,
  }
];

export default function ProLandingPage() {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleCheckout = (planId: string) => {
    setLoadingPlanId(planId);
    
    // Simulação do redirecionamento para o Pagar.me
    // Em produção, isso chamaria uma API route (ex: /api/checkout) que usaria o SDK do Pagar.me
    // para gerar o link de pagamento ou abrir o checkout transparente.
    setTimeout(() => {
      alert(`Redirecionando para o Checkout do Pagar.me (Plano ID: ${planId})`);
      setLoadingPlanId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-gray-950/80 backdrop-blur-md z-50">
        <Link href="/perfil" className="inline-block p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-7 h-7" />
        </Link>
        <div className="flex items-center gap-2 text-[#8B5CF6] font-extrabold text-xl tracking-tight">
          <Crown className="w-6 h-6" />
          Biblicando PRO
        </div>
        <div className="w-11"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 flex flex-col items-center p-6 max-w-5xl mx-auto w-full pb-24">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 mt-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-3xl flex items-center justify-center shadow-xl mb-8 rotate-12"
          >
            <Crown className="w-12 h-12 text-white -rotate-12" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">
            Acelere seu aprendizado com o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">Biblicando PRO</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-bold">
            Desbloqueie recursos exclusivos, remova os anúncios e aprenda sem limites com a ajuda da Inteligência Artificial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl border-4 p-8 flex flex-col ${
                plan.popular 
                  ? 'border-[#8B5CF6] shadow-[0_8px_30px_rgba(139,92,246,0.2)]' 
                  : 'border-gray-200 dark:border-gray-800 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-extrabold uppercase tracking-wider">
                  Mais Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-bold mb-1">/{plan.interval}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#58CC02] shrink-0" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleCheckout(plan.id)}
                disabled={loadingPlanId !== null}
                className={`w-full py-3 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_4px_0_#6D28D9] active:shadow-none active:translate-y-[4px]'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 shadow-[0_4px_0_#E5E7EB] dark:shadow-[0_4px_0_#1F2937] active:shadow-none active:translate-y-[4px]'
                }`}
              >
                {loadingPlanId === plan.id ? (
                  <span className="animate-pulse">Processando...</span>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Assinar Agora
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col items-center gap-4 text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            Pagamento 100% seguro processado pelo Pagar.me
          </div>
          <p className="text-xs font-medium text-center max-w-md">
            Você pode cancelar sua assinatura a qualquer momento nas configurações do seu perfil.
          </p>
        </div>

      </main>
    </div>
  );
}
