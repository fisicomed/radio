import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authConnector } from '../connectors';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  supabase: any; // Adicionado para acesso direto ao cliente Supabase
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar sessão inicial
    authConnector.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        authConnector.getProfile(session.user.id).then(setProfile).catch(console.error);
      }
      
      setLoading(false);
    });

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = authConnector.supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const userProfile = await authConnector.getProfile(session.user.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user } = await authConnector.signIn(email, password);
    if (!user) throw new Error('Login failed');
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { user } = await authConnector.signUp(email, password, fullName);
    if (!user) throw new Error('Sign up failed');
  };

  const signOut = async () => {
    await authConnector.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    await authConnector.resetPassword(email);
  };

  const value = {
    user,
    profile,
    session,
    loading,
    supabase: authConnector.supabase, // Adicionado acesso direto ao cliente
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
/* FORCE UPDATE: Thu Jun 18 22:31:55 UTC 2026 */
