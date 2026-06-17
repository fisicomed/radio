import supabase from './client';
import type { Database } from '../types/database.types';

type Patient = Database['public']['Tables']['patients']['Row'];
type PatientInsert = Database['public']['Tables']['patients']['Insert'];
type PatientUpdate = Database['public']['Tables']['patients']['Update'];

/**
 * Conector para operações com Pacientes
 */
export const patientConnector = {
  /**
   * Buscar todos os pacientes do tenant atual
   */
  findAll: async (tenantId: string, options?: { limit?: number; offset?: number; search?: string }) => {
    let query = supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,id_patient.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  /**
   * Buscar paciente por ID
   */
  findById: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Buscar paciente pelo identificador configurável (id_patient)
   */
  findByIdPatient: async (idPatient: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id_patient', idPatient)
      .eq('tenant_id', tenantId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Criar novo paciente
   */
  create: async (patient: PatientInsert) => {
    const { data, error } = await supabase
      .from('patients')
      .insert(patient)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Atualizar paciente
   */
  update: async (id: string, patient: PatientUpdate, tenantId: string) => {
    const { data, error } = await supabase
      .from('patients')
      .update(patient)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Deletar paciente (soft delete recomendado)
   */
  delete: async (id: string, tenantId: string) => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;
  },

  /**
   * Contar total de pacientes
   */
  count: async (tenantId: string) => {
    const { count, error } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return count || 0;
  },
};

export default patientConnector;
