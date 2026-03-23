"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, SkipForward, Send, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { TopBar } from '@/components/TopBar';
import Link from 'next/link';

type QuestionType = 'multiple_choice' | 'essay' | 'fill_in_the_blank';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctIndex?: number;
  blanks?: { index: number; answer: string }[];
  textParts?: string[];
}

export default function Licao() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [essayText, setEssayText] = useState('');
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; aiAnalysis?: string } | null>(null);
  const [progress, setProgress] = useState(20);
  const [skipsLeft, setSkipsLeft] = useState(3); // Depende do plano
  const [isRecording, setIsRecording] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('pro'); // Exemplo de plano

  const recognitionRef = useRef<any>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      type: "multiple_choice",
      text: "Quem foi engolido por um grande peixe após tentar fugir do chamado de Deus?",
      options: ["Moisés", "Jonas", "Davi", "Pedro"],
      correctIndex: 1
    },
    {
      id: 'q2',
      type: "fill_in_the_blank",
      text: "Complete o versículo (João 3:16):",
      textParts: ["Porque Deus amou o mundo de tal maneira que deu o seu Filho ", ", para que todo aquele que nele crê não pereça, mas tenha a vida ", "."],
      blanks: [
        { index: 0, answer: "unigênito" },
        { index: 1, answer: "eterna" }
      ]
    },
    {
      id: 'q3',
      type: "essay",
      text: "Explique brevemente o significado da parábola do Filho Pródigo.",
    }
  ];

  const question = questions[currentQuestionIndex];

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setEssayText(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setEssayText('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSelect = (index: number) => {
    if (isChecking) return;
    setSelectedOption(index);
    sounds?.playSelect();
  };

  const handleCheck = () => {
    if (question.type === 'multiple_choice' && selectedOption === null) return;
    if (question.type === 'essay' && !essayText.trim()) return;
    if (question.type === 'fill_in_the_blank') {
      const allFilled = question.blanks?.every(b => blankAnswers[b.index]?.trim().length > 0);
      if (!allFilled) return;
    }
    
    setIsChecking(true);
    
    if (question.type === 'multiple_choice') {
      const isCorrect = selectedOption === question.correctIndex;
      if (isCorrect) {
        sounds?.playSuccess();
        setFeedback({ isCorrect: true, message: "Excelente! Você acertou." });
        setProgress(prev => Math.min(prev + 40, 100));
      } else {
        sounds?.playError();
        setFeedback({ isCorrect: false, message: "Incorreto. A resposta certa era: " + question.options![question.correctIndex!] });
      }
    } else if (question.type === 'fill_in_the_blank') {
      let allCorrect = true;
      question.blanks?.forEach(b => {
        if (blankAnswers[b.index]?.trim().toLowerCase() !== b.answer.toLowerCase()) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        sounds?.playSuccess();
        setFeedback({ isCorrect: true, message: "Perfeito! Você completou corretamente." });
        setProgress(prev => Math.min(prev + 40, 100));
      } else {
        sounds?.playError();
        setFeedback({ isCorrect: false, message: "Algumas palavras estão incorretas. Tente novamente!" });
      }
    } else {
      // Simulação de correção por IA
      sounds?.playSuccess();
      setFeedback({ 
        isCorrect: true, 
        message: "Ótima reflexão!", 
        aiAnalysis: userPlan === 'pro' ? "Sua resposta capturou a essência do perdão e da graça incondicional de Deus, que são os temas centrais desta parábola. Muito bem elaborado!" : "Faça upgrade para o plano Pro para receber análises detalhadas da nossa IA sobre suas respostas dissertativas."
      });
      setProgress(prev => Math.min(prev + 40, 100));
    }
  };

  const handleSkip = () => {
    if (skipsLeft > 0) {
      setSkipsLeft(prev => prev - 1);
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setIsChecking(false);
    setSelectedOption(null);
    setEssayText('');
    setBlankAnswers({});
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Fim da lição
      alert("Lição concluída!");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <TopBar variant="lesson" progress={progress} />

      <main className="flex-1 p-6 flex flex-col w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors">
            {question.text}
          </h1>
          {skipsLeft > 0 && !isChecking && (
            <button 
              onClick={handleSkip}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-bold transition-colors"
            >
              <SkipForward className="w-5 h-5" />
              <span className="hidden sm:inline">Pular ({skipsLeft})</span>
            </button>
          )}
        </div>

        {question.type === 'multiple_choice' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(index)}
                  disabled={isChecking}
                  className={`p-4 md:p-6 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                    isSelected 
                      ? 'border-[#1CB0F6] bg-blue-50 dark:bg-blue-900/30 text-[#1CB0F6]' 
                      : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                  } ${isChecking && isSelected && index === question.correctIndex ? 'border-[#58CC02] bg-green-50 dark:bg-green-900/30 text-[#58CC02]' : ''}
                    ${isChecking && isSelected && index !== question.correctIndex ? 'border-[#FF4B4B] bg-red-50 dark:bg-red-900/30 text-[#FF4B4B]' : ''}
                  `}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        ) : question.type === 'fill_in_the_blank' ? (
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 text-xl font-medium text-gray-800 dark:text-gray-100 leading-loose">
            {question.textParts?.map((part, index) => (
              <span key={index}>
                {part}
                {index < (question.textParts?.length || 0) - 1 && (
                  <input
                    type="text"
                    value={blankAnswers[index] || ''}
                    onChange={(e) => setBlankAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                    disabled={isChecking}
                    className={`inline-block w-32 mx-2 px-2 py-1 text-center border-b-2 bg-transparent focus:outline-none transition-colors ${
                      isChecking
                        ? blankAnswers[index]?.trim().toLowerCase() === question.blanks?.find(b => b.index === index)?.answer.toLowerCase()
                          ? 'border-[#58CC02] text-[#58CC02]'
                          : 'border-[#FF4B4B] text-[#FF4B4B]'
                        : 'border-gray-400 focus:border-[#1CB0F6] text-[#1CB0F6]'
                    }`}
                  />
                )}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-full">
            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              disabled={isChecking}
              placeholder="Digite sua resposta aqui..."
              className="w-full flex-1 min-h-[200px] p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium text-lg resize-none focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleRecording}
                disabled={isChecking}
                className={`p-3 rounded-full flex items-center justify-center gap-3 font-bold text-white shadow-lg transition-colors ${
                  isRecording ? 'bg-[#FF4B4B] animate-pulse' : 'bg-[#1CB0F6] hover:bg-[#1899D6]'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                {isRecording ? 'Parar Gravação' : 'Responder por Voz'}
              </motion.button>
            </div>
          </div>
        )}
      </main>

      {/* Feedback Area */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-24 left-0 right-0 p-6 border-t-2 ${
              feedback.isCorrect 
                ? 'bg-green-100 dark:bg-green-900/90 border-green-200 dark:border-green-800' 
                : 'bg-red-100 dark:bg-red-900/90 border-red-200 dark:border-red-800'
            } z-40`}
          >
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${feedback.isCorrect ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300' : 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300'}`}>
                  {feedback.isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-extrabold ${feedback.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {feedback.isCorrect ? 'Mandou bem!' : 'Ops!'}
                  </h3>
                  <p className={`font-bold text-lg mt-1 ${feedback.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {feedback.message}
                  </p>
                  
                  {feedback.aiAnalysis && (
                    <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20">
                      <div className="flex items-center gap-2 mb-2 text-[#8B5CF6] dark:text-[#D946EF] font-extrabold">
                        <Sparkles className="w-5 h-5" />
                        Feedback da IA
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                        {feedback.aiAnalysis}
                      </p>
                      {userPlan !== 'pro' && (
                        <Link href="/perfil" className="inline-block mt-3 text-sm font-bold text-[#8B5CF6] hover:underline">
                          Conheça o Biblicando Pro &rarr;
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-6 pb-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300 relative z-50">
        <div className="max-w-3xl mx-auto">
          {!isChecking ? (
            <motion.button
              whileHover={(question.type === 'multiple_choice' ? selectedOption !== null : question.type === 'fill_in_the_blank' ? question.blanks?.every(b => blankAnswers[b.index]?.trim().length > 0) : essayText.trim().length > 0) ? { scale: 1.02 } : {}}
              whileTap={(question.type === 'multiple_choice' ? selectedOption !== null : question.type === 'fill_in_the_blank' ? question.blanks?.every(b => blankAnswers[b.index]?.trim().length > 0) : essayText.trim().length > 0) ? { scale: 0.95 } : {}}
              onClick={handleCheck}
              disabled={question.type === 'multiple_choice' ? selectedOption === null : question.type === 'fill_in_the_blank' ? !question.blanks?.every(b => blankAnswers[b.index]?.trim().length > 0) : essayText.trim().length === 0}
              className={`w-full py-3 px-8 rounded-2xl font-extrabold text-lg uppercase tracking-wider transition-all ${
                (question.type === 'multiple_choice' ? selectedOption !== null : question.type === 'fill_in_the_blank' ? question.blanks?.every(b => blankAnswers[b.index]?.trim().length > 0) : essayText.trim().length > 0)
                  ? 'bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_4px_0_#58A700] active:shadow-none active:translate-y-[4px]'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              Verificar
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuestion}
              className={`w-full py-3 px-8 rounded-2xl font-extrabold text-lg uppercase tracking-wider transition-all text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] ${
                feedback?.isCorrect ? 'bg-[#58CC02] hover:bg-[#46A302]' : 'bg-[#FF4B4B] hover:bg-[#E53935]'
              }`}
            >
              Continuar
            </motion.button>
          )}
        </div>
      </footer>
    </div>
  );
}
