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
      // @ts-ignore - Workaround for Supabase type inference issue
      .insert([{ ...protocol, usage_count: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async update(id: string, updates: Partial<Protocol>) {
    const { data, error } = await supabase
      .from('protocols')
      // @ts-ignore - Workaround for Supabase type inference issue
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
      // @ts-ignore - Workaround for Supabase type inference issue
      .update({ is_favorite: isFavorite, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Protocol;
  },

  async incrementUsage(id: string) {
    // Simplified fallback without complex chaining that causes type errors
    const { data: currentData } = await supabase
      .from('protocols')
      .select('usage_count')
      .eq('id', id)
      .single();
      
    const newcount: (currentData?.usage_count || 0) + 1;
    
    const { data, error } = await supabase
      .from('protocols')
      // @ts-ignore - Workaround for Supabase type inference issue
      .update({ usage_count: newCount, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
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
/* FORCE UPDATE: Thu Jun 18 22:31:55 UTC 2026 */
