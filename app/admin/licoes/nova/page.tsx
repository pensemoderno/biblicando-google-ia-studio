"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';

type QuestionType = 'multiple_choice' | 'essay' | 'fill_in_the_blank';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
}

export default function AdminNovaLicao() {
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: '',
      options: type === 'multiple_choice' ? ['', '', '', ''] : undefined,
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    // Aqui integraria com o backend para salvar a lição
    alert('Lição salva com sucesso! (Simulação)');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4">
        <Link href="/admin/licoes" className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Nova Lição</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">Crie conteúdo interativo para o Biblicando.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Título da Lição</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: A Criação do Mundo"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Módulo / Categoria</label>
            <input 
              type="text" 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              placeholder="Ex: Gênesis"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100">Questões ({questions.length})</h3>
          
          <div className="flex gap-2">
            <button 
              onClick={() => addQuestion('multiple_choice')}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-[#1CB0F6] rounded-xl font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Múltipla Escolha
            </button>
            <button 
              onClick={() => addQuestion('essay')}
              className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl font-bold text-sm hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Dissertativa
            </button>
            <button 
              onClick={() => addQuestion('fill_in_the_blank')}
              className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl font-bold text-sm hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Lacunas
            </button>
          </div>
        </div>

        {questions.map((q, index) => (
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm relative"
          >
            <button 
              onClick={() => removeQuestion(q.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                Questão {index + 1} • {
                  q.type === 'multiple_choice' ? 'Múltipla Escolha' : 
                  q.type === 'essay' ? 'Dissertativa (Avaliada por IA)' : 'Completar Lacunas'
                }
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Pergunta / Enunciado</label>
                <textarea 
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                  placeholder={q.type === 'fill_in_the_blank' ? "Use ___ para indicar a lacuna. Ex: No princípio criou Deus os ___ e a terra." : "Digite a pergunta..."}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors min-h-[100px] resize-y"
                />
              </div>

              {q.type === 'multiple_choice' && q.options && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Opções (A primeira será a correta)</label>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${optIdx === 0 ? 'bg-[#58CC02]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                        {optIdx === 0 ? '✓' : '✗'}
                      </div>
                      <input 
                        type="text" 
                        value={opt}
                        onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                        placeholder={`Opção ${optIdx === 0 ? 'correta' : `incorreta ${optIdx}`}`}
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-2 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
                      />
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 font-medium mt-2">
                    Nota: O aplicativo embaralhará as opções automaticamente para o usuário.
                  </p>
                </div>
              )}

              {q.type === 'fill_in_the_blank' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Palavra Correta (Lacuna)</label>
                  <input 
                    type="text" 
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(q.id, 'correctAnswer', e.target.value)}
                    placeholder="Palavra que preenche a lacuna..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#1CB0F6] transition-colors"
                  />
                </div>
              )}

              {q.type === 'essay' && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-purple-800 dark:text-purple-400 text-sm">Avaliação por IA</p>
                    <p className="text-sm text-purple-700 dark:text-purple-500 mt-1 font-medium">
                      A resposta do usuário será avaliada pelo agente Gemini com base no contexto bíblico da pergunta. Não é necessário definir uma resposta exata.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 font-bold">Nenhuma questão adicionada ainda.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Use os botões acima para começar a criar.</p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex justify-end gap-4 z-10">
        <Link 
          href="/admin/licoes"
          className="px-6 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-bold uppercase tracking-wider transition-colors"
        >
          Cancelar
        </Link>
        <button 
          onClick={handleSave}
          disabled={!title || questions.length === 0}
          className="flex items-center gap-2 px-8 py-3 bg-[#58CC02] hover:bg-[#46A302] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-extrabold uppercase tracking-wider shadow-[0_4px_0_#46A302] active:shadow-none active:translate-y-[4px] transition-all"
        >
          <Save className="w-5 h-5" />
          Salvar Lição
        </button>
      </div>
    </div>
  );
}
