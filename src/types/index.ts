// Tipos principais do sistema

export interface Tenant {
  id: string;
  name: string;
  patient_id_label: string; // Ex: "MV", "Prontuário", "ID Paciente"
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  tenant_id: string;
  role: 'admin' | 'medico' | 'fisico' | 'tecnico';
  full_name?: string;
  created_at: string;
}

export interface Patient {
  id: string;
  tenant_id: string;
  id_patient: string; // Identificador configurável
  name: string;
  birth_date?: string;
  gender?: 'M' | 'F' | 'O';
  cpf?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Protocol {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  category?: string;
  is_favorite: boolean;
  usage_count: number;
  definition: Record<string, unknown>; // JSONB para estrutura flexível
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type TreatmentPlanStatus = 
  | 'draft'           // Rascunho
  | 'pending_approval' // Em aprovação
  | 'approved'         // Aprovado
  | 'in_treatment'     // Em tratamento
  | 'completed'        // Concluído
  | 'cancelled';       // Cancelado

export interface TreatmentPlan {
  id: string;
  tenant_id: string;
  patient_id: string;
  protocol_id?: string;
  status: TreatmentPlanStatus;
  name: string;
  description?: string;
  prescription?: Record<string, unknown>; // JSONB
  approved_by?: string;
  approved_at?: string;
  started_at?: string;
  completed_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  tenant_id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  old_value?: Record<string, unknown>;
  new_value?: Record<string, unknown>;
  created_at: string;
}
