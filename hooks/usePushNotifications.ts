"use client";

import { useState, useEffect } from 'react';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Seu navegador não suporta notificações.');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        // Simular o envio de uma notificação de boas-vindas
        new Notification('Notificações Ativadas!', {
          body: 'Você receberá lembretes para manter sua ofensiva e novidades do Biblicando.',
          icon: '/favicon.ico' // Assumindo que existe um ícone
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
      return false;
    }
  };

  const sendMockNotification = (title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
    }
  };

  return {
    permission,
    requestPermission,
    sendMockNotification
  };
}
