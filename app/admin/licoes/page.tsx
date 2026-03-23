"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit2, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  module: string;
  questionsCount: number;
  status: 'published' | 'draft';
}

const mockLessons: Lesson[] = [
  { id: '1', title: 'A Criação do Mundo', module: 'Gênesis', questionsCount: 5, status: 'published' },
  { id: '2', title: 'A Arca de Noé', module: 'Gênesis', questionsCount: 8, status: 'published' },
  { id: '3', title: 'Os 10 Mandamentos', module: 'Êxodo', questionsCount: 10, status: 'draft' },
];

export default function AdminLicoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);

  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lesson.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Gerenciar Lições</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Crie, edite e organize o conteúdo do aplicativo.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar lição..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium focus:outline-none focus:border-[#1CB0F6] transition-colors w-full sm:w-64"
            />
          </div>
          <Link 
            href="/admin/licoes/nova"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-extrabold uppercase tracking-wider shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px] transition-all"
          >
            <Plus className="w-5 h-5" />
            Nova Lição
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Título da Lição</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Módulo</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Questões</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson, index) => (
                <motion.tr 
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1CB0F6]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">{lesson.title}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-600 dark:text-gray-300">
                    {lesson.module}
                  </td>
                  <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                    {lesson.questionsCount}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      lesson.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
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
              
              {filteredLessons.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Nenhuma lição encontrada.
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
