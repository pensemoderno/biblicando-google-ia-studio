"use client";

import { Flame, Heart, Zap, X, Share2, Copy, Check, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { sounds } from '@/lib/sounds';
import { useState, useEffect } from 'react';

interface TopBarProps {
  variant?: 'default' | 'lesson';
  progress?: number; // 0 to 100
}

export function TopBar({ variant = 'default', progress = 0 }: TopBarProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Ofensiva em Risco!', message: 'Faça uma lição agora para não perder seus 12 dias.', read: false, time: 'Agora' },
    { id: 2, title: 'Nova Funcionalidade', message: 'Confira os novos Desafios Diários!', read: false, time: '2h atrás' }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {
      // Ignore clipboard errors
    });
    setCopied(true);
    sounds?.playSuccess();
    setTimeout(() => {
      setCopied(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const markAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (variant === 'lesson') {
    return (
      <header className="flex items-center justify-between p-3 sm:p-4 pt-5 sm:pt-6 bg-white dark:bg-gray-950 sticky top-0 z-10 transition-colors duration-300">
        <Link href="/aprender" onClick={() => sounds?.playClick()} className="shrink-0">
          <X className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
        </Link>
        
        <div className="flex-1 mx-3 sm:mx-4">
          <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden transition-colors">
            <motion.div 
              className="h-full bg-[#1CB0F6]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-[#FF4B4B] font-bold text-base sm:text-lg shrink-0">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          <span>5</span>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="md:hidden font-extrabold text-lg sm:text-2xl text-[#1CB0F6] tracking-tight truncate mr-2">
        Biblicando
      </div>
      <div className="hidden md:block flex-1"></div>
      <div className="flex items-center gap-2 sm:gap-4 font-bold text-sm sm:text-lg shrink-0">
        <ThemeToggle />
        
        {/* Notificações */}
        <div className="relative flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowShareMenu(false);
              if (!showNotifications) markAsRead();
            }} 
            className="p-1 relative"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                key="notifications-menu"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-3 right-0 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-extrabold text-gray-800 dark:text-gray-100">Notificações</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100">{notification.title}</h4>
                          <span className="text-xs text-gray-400 font-medium">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-snug">{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Nenhuma notificação no momento.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ofensiva */}
        <div className="relative group flex items-center gap-1 sm:gap-1.5 text-[#FF9600] cursor-pointer">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span>12</span>
          
          {/* Tooltip */}
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            Sua ofensiva atual
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800 dark:border-b-gray-100"></div>
          </div>
        </div>

        {/* XP */}
        <div className="relative group flex items-center gap-1 sm:gap-1.5 text-[#FFD900] cursor-pointer">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span>2150</span>
          
          {/* Tooltip */}
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            Seu total de XP
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800 dark:border-b-gray-100"></div>
          </div>
        </div>

        {/* Vidas */}
        <div className="relative group flex items-center gap-1 sm:gap-1.5 text-[#FF4B4B] cursor-pointer">
          <motion.div
            animate={{ 
              scale: [1, 1.25, 1, 1.25, 1],
              rotate: [0, -10, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              times: [0, 0.1, 0.2, 0.3, 1],
              ease: "easeInOut" 
            }}
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current heart-pulse-color" />
          </motion.div>
          <span>5</span>
          
          {/* Tooltip */}
          <div className="absolute top-full mt-3 right-0 px-3 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
            Suas vidas restantes
            <div className="absolute bottom-full right-3 border-4 border-transparent border-b-gray-800 dark:border-b-gray-100"></div>
          </div>
        </div>

        {/* Share */}
        <div className="relative flex items-center gap-1 sm:gap-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
          <button 
            onClick={() => {
              setShowShareMenu(!showShareMenu);
              setShowNotifications(false);
            }} 
            className="p-1"
          >
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          {/* Context Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div 
                key="share-menu"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-3 right-0 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <button 
                  onClick={() => handleCopyLink()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Link Copiado!" : "Copiar Link"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
