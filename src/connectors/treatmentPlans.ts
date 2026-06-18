import { supabase } from './supabase';
import type { TreatmentPlan, TreatmentPlanStatus } from '../types';

export const treatmentPlansConnector = {
  async getAll(tenantId: string, status?: TreatmentPlanStatus) {
    let query = supabase
      .from('treatment_plans')
      .select('*')
      .eq('tenant_id', tenantId);
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as TreatmentPlan[];
  },

  async getById(tenantId: string, id: string) {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as TreatmentPlan;
  },

  async getByPatient(tenantId: string, patientId: string) {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as TreatmentPlan[];
  },

  async create(plan: Omit<TreatmentPlan, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('treatment_plans')
      // @ts-ignore - Workaround for Supabase type inference issue
      .insert([plan])
      .select()
      .single();
    
    if (error) throw error;
    return data as TreatmentPlan;
  },

  async update(id: string, updates: Partial<TreatmentPlan>) {
    const { data, error } = await supabase
      .from('treatment_plans')
      // @ts-ignore - Workaround for Supabase type inference issue
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as TreatmentPlan;
  },

  async submitForApproval(id: string) {
    return this.update(id, { 
      status: 'pending_approval' as TreatmentPlanStatus,
      updated_at: new Date().toISOString()
    });
  },

  async approve(id: string, approvedBy: string) {
    return this.update(id, { 
      status: 'approved' as TreatmentPlanStatus,
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  },

  async startTreatment(id: string) {
    return this.update(id, { 
      status: 'in_treatment' as TreatmentPlanStatus,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  },

  async completeTreatment(id: string) {
    return this.update(id, { 
      status: 'completed' as TreatmentPlanStatus,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  },

  async cancel(id: string) {
    return this.update(id, { 
      status: 'cancelled' as TreatmentPlanStatus,
      updated_at: new Date().toISOString()
    });
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('treatment_plans')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

export default treatmentPlansConnector;
/* FORCE UPDATE: Thu Jun 18 22:31:55 UTC 2026 */
