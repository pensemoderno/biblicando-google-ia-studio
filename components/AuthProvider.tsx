"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: 'free' | 'pro';
  skipsLeft: number;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de verificação de sessão
    const timer = setTimeout(() => {
      // Não loga automaticamente, apenas finaliza o loading
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    // Simulação
    setUser({ uid: 'test-user-123', email: 'test@example.com', displayName: 'Usuário Teste' });
    setProfile({
      uid: 'test-user-123',
      email: 'test@example.com',
      displayName: 'Usuário Teste',
      plan: 'free',
      skipsLeft: 3,
    });
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
