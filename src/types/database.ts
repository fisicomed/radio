// Database schema types for Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          patient_id_label: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          patient_id_label?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          patient_id_label?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          tenant_id: string;
          role: 'admin' | 'medico' | 'fisico' | 'tecnico';
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          tenant_id: string;
          role: 'admin' | 'medico' | 'fisico' | 'tecnico';
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          tenant_id?: string;
          role?: 'admin' | 'medico' | 'fisico' | 'tecnico';
          full_name?: string | null;
          created_at?: string;
        };
      };
      patients: {
        Row: {
          id: string;
          tenant_id: string;
          id_patient: string;
          name: string;
          birth_date: string | null;
          gender: 'M' | 'F' | 'O' | null;
          cpf: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          id_patient: string;
          name: string;
          birth_date?: string | null;
          gender?: 'M' | 'F' | 'O' | null;
          cpf?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          id_patient?: string;
          name?: string;
          birth_date?: string | null;
          gender?: 'M' | 'F' | 'O' | null;
          cpf?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      protocols: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description: string | null;
          category: string | null;
          is_favorite: boolean;
          usage_count: number;
          definition: Json;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          category?: string | null;
          is_favorite?: boolean;
          usage_count?: number;
          definition?: Json;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string | null;
          category?: string | null;
          is_favorite?: boolean;
          usage_count?: number;
          definition?: Json;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      treatment_plans: {
        Row: {
          id: string;
          tenant_id: string;
          patient_id: string;
          protocol_id: string | null;
          status: 'draft' | 'pending_approval' | 'approved' | 'in_treatment' | 'completed' | 'cancelled';
          name: string;
          description: string | null;
          prescription: Json | null;
          approved_by: string | null;
          approved_at: string | null;
          started_at: string | null;
          completed_at: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          patient_id: string;
          protocol_id?: string | null;
          status?: 'draft' | 'pending_approval' | 'approved' | 'in_treatment' | 'completed' | 'cancelled';
          name: string;
          description?: string | null;
          prescription?: Json | null;
          approved_by?: string | null;
          approved_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          patient_id?: string;
          protocol_id?: string | null;
          status?: 'draft' | 'pending_approval' | 'approved' | 'in_treatment' | 'completed' | 'cancelled';
          name?: string;
          description?: string | null;
          prescription?: Json | null;
          approved_by?: string | null;
          approved_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          action: string;
          table_name: string;
          record_id: string;
          old_value: Json | null;
          new_value: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          action: string;
          table_name: string;
          record_id: string;
          old_value?: Json | null;
          new_value?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          action?: string;
          table_name?: string;
          record_id?: string;
          old_value?: Json | null;
          new_value?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
  };
}
