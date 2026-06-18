import { supabase } from './supabase';
import type { Protocol } from '../types';

export const protocolsConnector = {
  async getAll(tenantId: string) {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('name');
    
    if (error) throw error;
    return data as Protocol[];
  },

  async getFavorites(tenantId: string) {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_favorite', true)
      .order('name');
    
    if (error) throw error;
    return data as Protocol[];
  },

  async getById(tenantId: string, id: string) {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async create(protocol: Omit<Protocol, 'id' | 'created_at' | 'updated_at' | 'usage_count'>) {
    const { data, error } = await supabase
      .from('protocols')
      .insert([{ ...protocol, usage_count: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async update(id: string, updates: Partial<Protocol>) {
    const { data, error } = await supabase
      .from('protocols')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const { data, error } = await supabase
      .from('protocols')
      .update({ is_favorite: isFavorite, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async incrementUsage(id: string) {
    const { data, error } = await supabase.rpc('increment_protocol_usage', { protocol_id: id });
    
    // Fallback se a RPC não existir
    if (error) {
      const { data: fallbackData, error: updateError } = await supabase
        .from('protocols')
        .update({ 
          usage_count: supabase.from('protocols').select('usage_count').eq('id', id).then(r => (r.data?.[0]?.usage_count || 0) + 1),
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      return fallbackData as Protocol;
    }
    
    return data as Protocol;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('protocols')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

export default protocolsConnector;
