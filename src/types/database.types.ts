// Tipos gerados automaticamente pelo Supabase CLI
// Execute: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

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
      // Tabela de tenants (clínicas/hospitais)
      tenants: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          settings: Json; // Configurações do tenant (ex: nome do id_patient)
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
          settings?: Json;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
          settings?: Json;
          is_active?: boolean;
        };
      };

      // Perfis de usuário (vincula usuários aos tenants)
      profiles: {
        Row: {
          id: string;
          tenant_id: string;
          role: 'admin' | 'medico' | 'fisico' | 'tecnico';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tenant_id: string;
          role: 'admin' | 'medico' | 'fisico' | 'tecnico';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          role?: 'admin' | 'medico' | 'fisico' | 'tecnico';
          created_at?: string;
          updated_at?: string;
        };
      };

      // Pacientes
      patients: {
        Row: {
          id: string;
          tenant_id: string;
          id_patient: string; // Identificador configurável (MV ou Prontuário)
          name: string;
          birth_date: string;
          gender: 'M' | 'F' | 'O';
          created_at: string;
          updated_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          id_patient: string;
          name: string;
          birth_date: string;
          gender: 'M' | 'F' | 'O';
          created_at?: string;
          updated_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          id_patient?: string;
          name?: string;
          birth_date?: string;
          gender?: 'M' | 'F' | 'O';
          created_at?: string;
          updated_at?: string;
          created_by?: string;
        };
      };

      // Protocolos de tratamento
      protocols: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description?: string;
          category: string;
          is_favorite: boolean;
          usage_count: number;
          definition: Json; // Estrutura flexível do protocolo
          created_at: string;
          updated_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string;
          category: string;
          is_favorite?: boolean;
          usage_count?: number;
          definition: Json;
          created_at?: string;
          updated_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string;
          category?: string;
          is_favorite?: boolean;
          usage_count?: number;
          definition?: Json;
          created_at?: string;
          updated_at?: string;
          created_by?: string;
        };
      };

      // Favoritos manuais dos usuários
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          protocol_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          protocol_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          protocol_id?: string;
          created_at?: string;
        };
      };

      // Planos de tratamento
      treatment_plans: {
        Row: {
          id: string;
          tenant_id: string;
          patient_id: string;
          protocol_id: string;
          status: 'rascunho' | 'pendente_aprovacao' | 'aprovado' | 'rejeitado' | 'em_tratamento' | 'concluido';
          created_at: string;
          updated_at: string;
          created_by: string;
          approved_by?: string;
          approved_at?: string;
          rejection_reason?: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          patient_id: string;
          protocol_id: string;
          status?: 'rascunho' | 'pendente_aprovacao' | 'aprovado' | 'rejeitado' | 'em_tratamento' | 'concluido';
          created_at?: string;
          updated_at?: string;
          created_by: string;
          approved_by?: string;
          approved_at?: string;
          rejection_reason?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          patient_id?: string;
          protocol_id?: string;
          status?: 'rascunho' | 'pendente_aprovacao' | 'aprovado' | 'rejeitado' | 'em_tratamento' | 'concluido';
          created_at?: string;
          updated_at?: string;
          created_by?: string;
          approved_by?: string;
          approved_at?: string;
          rejection_reason?: string;
        };
      };

      // Logs de auditoria
      audit_logs: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          action: string;
          table_name: string;
          record_id: string;
          old_value?: Json;
          new_value?: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          action: string;
          table_name: string;
          record_id: string;
          old_value?: Json;
          new_value?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          action?: string;
          table_name?: string;
          record_id?: string;
          old_value?: Json;
          new_value?: Json;
          created_at?: string;
        };
      };
    };
    Views: {
      // Views para analytics (dados anonimizados)
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
