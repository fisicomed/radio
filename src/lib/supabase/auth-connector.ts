import supabase from './client';
import type { Database } from '../types/database.types';

type Tenant = Database['public']['Tables']['tenants']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

/**
 * Conector para operações relacionadas ao tenant e autenticação
 */
export const authConnector = {
  /**
   * Sign in com email e senha
   */
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign up (apenas para admin criar primeiros usuários)
   */
  signUp: async (email: string, password: string, metadata?: Record<string, unknown>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Obter sessão atual
   */
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Obter usuário atual
   */
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  /**
   * Obter perfil do usuário (com role e tenant_id)
   */
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  },

  /**
   * Criar perfil após signup (chamado pelo trigger ou manualmente)
   */
  createProfile: async (userId: string, tenantId: string, role: Profile['role']) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        tenant_id: tenantId,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Obter tenant do usuário atual
   */
  getCurrentTenant: async () => {
    const user = await authConnector.getUser();
    if (!user) return null;

    const tenantId = user.user_metadata?.tenant_id || user.app_metadata?.tenant_id;
    if (!tenantId) return null;

    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Resetar senha
   */
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  },

  /**
   * Update senha
   */
  updatePassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },

  /**
   * Sign out
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Listener para mudanças na autenticação
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default authConnector;
