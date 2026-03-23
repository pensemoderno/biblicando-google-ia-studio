"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Heart, Flame, Trophy } from 'lucide-react';
import { sounds } from '@/lib/sounds';

const steps = [
  {
    icon: BookOpen,
    color: "text-[#1CB0F6]",
    title: "Bem-vindo ao Biblicando!",
    description: "Sua jornada de aprendizado bíblico começa aqui. Vamos conhecer como o app funciona?"
  },
  {
    icon: Heart,
    color: "text-[#FF4B4B]",
    title: "Vidas",
    description: "Você começa com 5 vidas. Se errar uma questão, perde uma. Mas não se preocupe, elas se recuperam com o tempo!"
  },
  {
    icon: Flame,
    color: "text-[#FF9600]",
    title: "Ofensiva",
    description: "Estude todos os dias para manter sua ofensiva (chama) acesa. Mostre sua constância no aprendizado!"
  },
  {
    icon: Trophy,
    color: "text-[#FFD900]",
    title: "XP e Ranking",
    description: "Complete lições para ganhar pontos de experiência (XP) e suba de divisão no Ranking semanal!"
  }
];

export function Tutorial() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Verifica se o usuário já viu o tutorial
    const hasSeen = localStorage.getItem('biblicando_tutorial_seen');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    sounds?.playClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      sounds?.playSuccess();
      setIsVisible(false);
      localStorage.setItem('biblicando_tutorial_seen', 'true');
    }
  };

  if (!isVisible) return null;

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center border-2 border-gray-100 dark:border-gray-800"
        >
          <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 shadow-inner">
            <StepIcon className={`w-12 h-12 ${steps[currentStep].color}`} />
          </div>
          
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            {steps[currentStep].title}
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 font-bold mb-8 leading-relaxed">
            {steps[currentStep].description}
          </p>

          <div className="flex gap-2 mb-8">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-8 bg-[#1CB0F6]' : 'w-2.5 bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full py-3 px-8 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-extrabold text-base uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all"
          >
            {currentStep === steps.length - 1 ? "Começar!" : "Continuar"}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
