"use client";

import { useState } from 'react';
import { Bell, Send, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function AdminNotificacoes() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sendMockNotification, permission } = usePushNotifications();

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);

    // Simula o envio da notificação push para o backend
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      
      // Dispara uma notificação local para demonstração se o admin tiver permitido
      if (permission === 'granted') {
        sendMockNotification('Simulação: ' + title, message);
      } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Simulação: ' + title, {
          body: message,
          icon: '/favicon.ico'
        });
      }

      setTitle('');
      setMessage('');

      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">Notificações Push</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Envie alertas, lembretes de ofensiva e novidades para os usuários.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <form onSubmit={handleSendNotification} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
            
            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl flex items-center gap-3 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-medium">Notificação enviada com sucesso para a fila de disparo!</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Público Alvo</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${target === 'all' ? 'border-[#1CB0F6] bg-blue-50 dark:bg-blue-900/20 text-[#1CB0F6]' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                    <input type="radio" name="target" value="all" checked={target === 'all'} onChange={(e) => setTarget(e.target.value)} className="sr-only" />
                    <Users className="w-6 h-6 mb-2" />
                    <span className="font-bold text-sm">Todos os Usuários</span>
                  </label>
                  <label className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${target === 'inactive' ? 'border-[#FF9600] bg-orange-50 dark:bg-orange-900/20 text-[#FF9600]' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                    <input type="radio" name="target" value="inactive" checked={target === 'inactive'} onChange={(e) => setTarget(e.target.value)} className="sr-only" />
                    <AlertCircle className="w-6 h-6 mb-2" />
                    <span className="font-bold text-sm">Inativos (&gt; 24h)</span>
                  </label>
                  <label className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${target === 'pro' ? 'border-[#8B5CF6] bg-purple-50 dark:bg-purple-900/20 text-[#8B5CF6]' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                    <input type="radio" name="target" value="pro" checked={target === 'pro'} onChange={(e) => setTarget(e.target.value)} className="sr-only" />
                    <Bell className="w-6 h-6 mb-2" />
                    <span className="font-bold text-sm">Apenas PRO</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Título da Notificação</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Sua ofensiva está em risco!"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-[#1CB0F6] dark:focus:border-[#1CB0F6] font-medium text-gray-800 dark:text-gray-100 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Faça uma lição agora mesmo para não perder seus dias de ofensiva."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-[#1CB0F6] dark:focus:border-[#1CB0F6] font-medium text-gray-800 dark:text-gray-100 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">Dica: Mantenha a mensagem curta e direta. Emojis são bem-vindos! 🔥</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <button 
                type="submit"
                disabled={sending || !title || !message}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1CB0F6] hover:bg-[#1899D6] text-white px-8 py-3 rounded-xl font-extrabold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_#1899D6] active:shadow-none active:translate-y-[4px]"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {sending ? 'Enviando...' : 'Enviar Notificação'}
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="font-extrabold text-gray-800 dark:text-gray-100 mb-4">Preview no Dispositivo</h3>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl relative overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              
              <div className="mt-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-[#1CB0F6] rounded-md flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">B</span>
                  </div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Biblicando</span>
                  <span className="text-xs text-gray-400 ml-auto">agora</span>
                </div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100 leading-tight mb-1">
                  {title || 'Título da Notificação'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
                  {message || 'A mensagem da sua notificação aparecerá aqui. Digite algo para visualizar.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-6">
            <h3 className="font-extrabold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Boas Práticas
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 list-disc list-inside font-medium">
              <li>Não envie mais de 1 notificação por dia para o mesmo usuário.</li>
              <li>Use gatilhos de urgência (ex: &quot;Sua ofensiva vai zerar!&quot;).</li>
              <li>Personalize a mensagem de acordo com o público alvo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
