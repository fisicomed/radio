import supabase from './client';
import type { Database } from '../types/database.types';

type Protocol = Database['public']['Tables']['protocols']['Row'];
type ProtocolInsert = Database['public']['Tables']['protocols']['Insert'];
type ProtocolUpdate = Database['public']['Tables']['protocols']['Update'];

/**
 * Conector para operações com Protocolos
 */
export const protocolConnector = {
  /**
   * Buscar todos os protocolos do tenant atual
   */
  findAll: async (tenantId: string, options?: { category?: string; search?: string }) => {
    let query = supabase
      .from('protocols')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('usage_count', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  /**
   * Buscar protocolos favoritos do usuário
   */
  findFavorites: async (userId: string, tenantId: string) => {
    const { data: favorites, error: favError } = await supabase
      .from('user_favorites')
      .select('protocol_id')
      .eq('user_id', userId);

    if (favError) throw favError;

    if (favorites.length === 0) return [];

    const protocolIds = favorites.map(f => f.protocol_id);

    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .in('id', protocolIds)
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return data;
  },

  /**
   * Adicionar protocolo aos favoritos
   */
  addToFavorites: async (userId: string, protocolId: string) => {
    const { error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: userId,
        protocol_id: protocolId,
      });

    if (error) throw error;
  },

  /**
   * Remover protocolo dos favoritos
   */
  removeFromFavorites: async (userId: string, protocolId: string) => {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('protocol_id', protocolId);

    if (error) throw error;
  },

  /**
   * Verificar se protocolo é favorito do usuário
   */
  isFavorite: async (userId: string, protocolId: string) => {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('protocol_id', protocolId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  /**
   * Incrementar contador de uso do protocolo
   */
  incrementUsage: async (protocolId: string) => {
    const { error } = await supabase.rpc('increment_protocol_usage', {
      p_protocol_id: protocolId,
    });

    // Se a RPC não existir, faz update direto
    if (error && error.code === '42883') {
      const { error: updateError } = await supabase
        .from('protocols')
        .update({ usage_count: supabase.rpc('usage_count + 1') as any })
        .eq('id', protocolId);

      if (updateError) throw updateError;
    } else if (error) {
      throw error;
    }
  },

  /**
   * Buscar protocolo por ID
   */
  findById: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Criar novo protocolo
   */
  create: async (protocol: ProtocolInsert) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Atualizar protocolo
   */
  update: async (id: string, protocol: ProtocolUpdate, tenantId: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .update(protocol)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Deletar protocolo
   */
  delete: async (id: string, tenantId: string) => {
    const { error } = await supabase
      .from('protocols')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;
  },

  /**
   * Buscar categorias disponíveis
   */
  getCategories: async (tenantId: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('category')
      .eq('tenant_id', tenantId)
      .not('category', 'is', null);

    if (error) throw error;

    const categories = [...new Set(data.map(p => p.category))];
    return categories.sort();
  },
};

export default protocolConnector;
