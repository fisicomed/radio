import { supabase } from './supabase';
import type { Patient } from '../types';

export const patientsConnector = {
  async getAll(tenantId: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('name');
    
    if (error) throw error;
    return data as Patient[];
  },

  async getById(tenantId: string, id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Patient;
  },

  async getByIdPatient(tenantId: string, idPatient: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id_patient', idPatient)
      .single();
    
    if (error) throw error;
    return data as Patient;
  },

  async search(tenantId: string, query: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', tenantId)
      .or(`name.ilike.%${query}%,id_patient.ilike.%${query}%`)
      .limit(20);
    
    if (error) throw error;
    return data as Patient[];
  },

  async create(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single();
    
    if (error) throw error;
    return data as Patient;
  },

  async update(id: string, updates: Partial<Patient>) {
    const { data, error } = await supabase
      .from('patients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Patient;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

export default patientsConnector;
