import supabase from './client';
import type { Database } from '../types/database.types';

type TreatmentPlan = Database['public']['Tables']['treatment_plans']['Row'];
type TreatmentPlanInsert = Database['public']['Tables']['treatment_plans']['Insert'];
type TreatmentPlanUpdate = Database['public']['Tables']['treatment_plans']['Update'];

/**
 * Conector para operações com Planos de Tratamento
 */
export const treatmentPlanConnector = {
  /**
   * Buscar todos os planos de tratamento do tenant atual
   */
  findAll: async (tenantId: string, options?: { 
    status?: TreatmentPlan['status']; 
    patientId?: string;
    limit?: number;
    offset?: number;
  }) => {
    let query = supabase
      .from('treatment_plans')
      .select(`
        *,
        patients (id, name, id_patient),
        protocols (id, name, category)
      `)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.patientId) {
      query = query.eq('patient_id', options.patientId);
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
   * Buscar plano por ID
   */
  findById: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select(`
        *,
        patients (id, name, id_patient),
        protocols (id, name, category, definition)
      `)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Criar novo plano de tratamento
   */
  create: async (plan: TreatmentPlanInsert) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .insert(plan)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Atualizar plano de tratamento
   */
  update: async (id: string, plan: TreatmentPlanUpdate, tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update(plan)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Submeter plano para aprovação
   */
  submitForApproval: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update({ status: 'pendente_aprovacao' })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Aprovar plano de tratamento
   */
  approve: async (id: string, tenantId: string, approvedBy: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update({
        status: 'aprovado',
        approved_by: approvedBy,
        approved_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Rejeitar plano de tratamento
   */
  reject: async (id: string, tenantId: string, reason: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update({
        status: 'rejeitado',
        rejection_reason: reason,
      })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Iniciar tratamento
   */
  startTreatment: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update({ status: 'em_tratamento' })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Concluir tratamento
   */
  complete: async (id: string, tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .update({ status: 'concluido' })
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Deletar plano (apenas se estiver em rascunho ou rejeitado)
   */
  delete: async (id: string, tenantId: string) => {
    // Verificar status antes de deletar
    const plan = await treatmentPlanConnector.findById(id, tenantId);
    
    if (plan.status !== 'rascunho' && plan.status !== 'rejeitado') {
      throw new Error('Só é possível deletar planos em rascunho ou rejeitados');
    }

    const { error } = await supabase
      .from('treatment_plans')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;
  },

  /**
   * Contar planos por status
   */
  countByStatus: async (tenantId: string) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select('status')
      .eq('tenant_id', tenantId);

    if (error) throw error;

    const counts: Record<string, number> = {};
    data.forEach(plan => {
      counts[plan.status] = (counts[plan.status] || 0) + 1;
    });

    return counts;
  },
};

export default treatmentPlanConnector;
