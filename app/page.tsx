"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, BrainCircuit, Flame, Trophy, ChevronRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/components/AuthProvider';

const onboardingSteps = [
  {
    icon: BookOpen,
    title: 'Aprenda a Bíblia',
    description: 'Estude as escrituras de forma divertida, interativa e no seu próprio ritmo.',
    color: 'from-blue-400 to-blue-600',
    iconColor: 'text-blue-500'
  },
  {
    icon: BrainCircuit,
    title: 'Questões com IA',
    description: 'Responda perguntas geradas por Inteligência Artificial adaptadas ao seu nível.',
    color: 'from-purple-400 to-purple-600',
    iconColor: 'text-purple-500'
  },
  {
    icon: Flame,
    title: 'Mantenha a Ofensiva',
    description: 'Estude todos os dias para não perder sua ofensiva e ganhar mais XP.',
    color: 'from-orange-400 to-orange-600',
    iconColor: 'text-orange-500'
  },
  {
    icon: Trophy,
    title: 'Suba no Ranking',
    description: 'Compita com amigos e pessoas do mundo todo nas ligas semanais.',
    color: 'from-yellow-400 to-yellow-600',
    iconColor: 'text-yellow-500'
  }
];

export default function LandingPage() {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/aprender');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextStep = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    }
  };

  // MOBILE ONBOARDING VIEW
  if (isMobile) {
    const currentStep = onboardingSteps[step];
    const Icon = currentStep.icon;
    const isLastStep = step === onboardingSteps.length - 1;

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300">
        <div className="flex justify-between items-center p-6">
          <div className="text-[#1CB0F6] font-extrabold text-xl tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Biblicando
          </div>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="flex flex-col items-center w-full max-w-sm"
            >
              <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${currentStep.color} flex items-center justify-center mb-10 shadow-2xl shadow-current/20`}>
                <Icon className="w-20 h-20 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
                {currentStep.title}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {currentStep.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6 pb-12 space-y-6">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSteps.map((_, i) => (
              <div 
                key={i} 
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-[#1CB0F6]' : 'w-2.5 bg-gray-200 dark:bg-gray-800'
                }`}
              />
            ))}
          </div>

          {!isLastStep ? (
            <button 
              onClick={nextStep}
              className="w-full py-3 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
              Continuar
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Link 
                href="/cadastro"
                className="w-full py-3 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center"
              >
                Começar agora
              </Link>
              <Link 
                href="/login"
                className="w-full py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#E5E7EB] dark:shadow-[0_4px_0_#1F2937] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center"
              >
                Já tenho uma conta
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // DESKTOP LANDING PAGE VIEW
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-sans selection:bg-[#1CB0F6] selection:text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#1CB0F6] font-extrabold text-3xl tracking-tight">
          <BookOpen className="w-10 h-10" />
          Biblicando
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link 
            href="/login"
            className="hidden sm:block font-extrabold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 uppercase tracking-wider transition-colors"
          >
            Entrar
          </Link>
          <Link 
            href="/cadastro"
            className="px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl font-extrabold uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all"
          >
            Começar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight leading-[1.1]">
            A forma grátis, divertida e eficaz de aprender a <span className="text-[#1CB0F6]">Bíblia!</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Aprenda com lições curtas, ganhe pontos, desbloqueie conquistas e conte com o poder da Inteligência Artificial para tirar suas dúvidas em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Link 
              href="/cadastro"
              className="w-full sm:w-auto px-10 py-4 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl font-extrabold text-lg uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all text-center"
            >
              Começar agora
            </Link>
            <Link 
              href="/login"
              className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-extrabold text-lg uppercase tracking-wider shadow-[0_4px_0_#E5E7EB] dark:shadow-[0_4px_0_#1F2937] active:shadow-none active:translate-y-[4px] transition-all text-center"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
          <div className="bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="space-y-6 relative z-10">
              {/* Mockup UI Elements */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex gap-4 font-bold text-sm">
                  <span className="text-orange-500 flex items-center gap-1"><Flame className="w-4 h-4 fill-current"/> 12</span>
                  <span className="text-yellow-500 flex items-center gap-1"><Zap className="w-4 h-4 fill-current"/> 2150</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-800 dark:text-gray-100 mb-1">IA do Biblicando</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Qual foi o primeiro milagre de Jesus?</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-300">A multiplicação dos pães</div>
                  <div className="p-4 rounded-xl border-2 border-[#58CC02] bg-green-50 dark:bg-green-900/20 font-bold text-[#58CC02] flex justify-between items-center">
                    Transformar água em vinho
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-300">A cura do cego</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
              Por que aprender com o Biblicando?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: BrainCircuit,
                title: 'Inteligência Artificial',
                desc: 'Nossas questões são geradas dinamicamente e avaliadas por IA, garantindo um aprendizado profundo e sem repetições.',
                color: 'text-purple-500',
                bg: 'bg-purple-100 dark:bg-purple-900/30'
              },
              {
                icon: Trophy,
                title: 'Gamificação',
                desc: 'Ganhe XP, suba de nível, mantenha sua ofensiva diária e compita com amigos nas ligas semanais.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-100 dark:bg-yellow-900/30'
              },
              {
                icon: Globe,
                title: 'Aprenda em Qualquer Lugar',
                desc: 'Com o modo offline, você pode baixar suas lições e continuar estudando mesmo sem conexão com a internet.',
                color: 'text-blue-500',
                bg: 'bg-blue-100 dark:bg-blue-900/30'
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-3xl ${feature.bg} flex items-center justify-center transform -rotate-6`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
              Escolha seu Plano
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
              Desbloqueie todo o potencial do Biblicando com o plano Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Básico</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Grátis</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-4">Para começar sua jornada.</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  Acesso às lições básicas
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  Vidas limitadas
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  Com anúncios
                </li>
              </ul>
              
              <Link 
                href="/cadastro"
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-colors text-center"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border-2 border-[#1CB0F6] rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-blue-500/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1CB0F6] text-white px-4 py-1 rounded-full font-extrabold text-sm uppercase tracking-wider">
                Mais Popular
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-[#1CB0F6] mb-2">Biblicando Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">R$ 19,90</span>
                  <span className="text-gray-500 dark:text-gray-400 font-bold">/mês</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-4">A experiência completa de aprendizado.</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-[#58CC02]" />
                  Vidas infinitas
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-[#58CC02]" />
                  Sem anúncios
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-[#58CC02]" />
                  Estatísticas detalhadas com IA
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-5 h-5 text-[#58CC02]" />
                  Acesso a todos os desafios
                </li>
              </ul>
              
              <Link 
                href="/cadastro?plan=pro"
                className="w-full py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all text-center"
              >
                Assinar Pro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
