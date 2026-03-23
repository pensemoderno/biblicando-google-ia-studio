"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MoreVertical, Shield, ShieldAlert, UserX, UserCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  status: 'active' | 'banned';
  joinDate: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', plan: 'pro', status: 'active', joinDate: '10/10/2023' },
  { id: '2', name: 'Maria Souza', email: 'maria@example.com', plan: 'free', status: 'active', joinDate: '15/10/2023' },
  { id: '3', name: 'Pedro Santos', email: 'pedro@example.com', plan: 'free', status: 'banned', joinDate: '20/10/2023' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@example.com', plan: 'pro', status: 'active', joinDate: '01/11/2023' },
  { id: '5', name: 'Lucas Costa', email: 'lucas@example.com', plan: 'free', status: 'active', joinDate: '05/11/2023' },
];

export default function AdminUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'active' ? 'banned' : 'active' };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Gerenciar Usuários</h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2">Visualize e administre as contas do Biblicando.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium focus:outline-none focus:border-[#1CB0F6] transition-colors w-full md:w-80"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Usuário</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Plano</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider hidden md:table-cell">Data de Entrada</th>
                <th className="p-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      user.plan === 'pro' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {user.status === 'active' ? <Shield className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                      {user.status === 'active' ? 'Ativo' : 'Banido'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 font-medium hidden md:table-cell">
                    {user.joinDate}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        user.status === 'active' 
                          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                          : 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                      }`}
                      title={user.status === 'active' ? 'Banir Usuário' : 'Reativar Usuário'}
                    >
                      {user.status === 'active' ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Nenhum usuário encontrado.
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
