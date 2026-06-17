# Conector Supabase

Este diretório contém os connectors para integração com o Supabase, organizados por domínio.

## Estrutura

```
src/lib/supabase/
├── client.ts              # Cliente Supabase configurado + helpers de auth
├── auth-connector.ts      # Operações de autenticação e perfil
├── patient-connector.ts   # CRUD de pacientes
├── protocol-connector.ts  # CRUD de protocolos e favoritos
├── treatment-plan-connector.ts  # Planos de tratamento e workflow
└── index.ts               # Export unificado
```

## Tipos

Os tipos TypeScript são gerados automaticamente pelo Supabase CLI e armazenados em:
```
src/types/database.types.ts
```

Para atualizar os tipos após mudanças no schema:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

## Uso

### Importação

```typescript
import { 
  supabase, 
  authConnector, 
  patientConnector, 
  protocolConnector, 
  treatmentPlanConnector 
} from '@/lib/supabase';
```

### Exemplos

#### Autenticação

```typescript
// Login
const { user, session } = await authConnector.signIn(email, password);

// Obter usuário atual
const user = await authConnector.getUser();

// Obter perfil (com role e tenant_id)
const profile = await authConnector.getProfile(user.id);

// Logout
await authConnector.signOut();
```

#### Pacientes

```typescript
// Listar pacientes com busca
const patients = await patientConnector.findAll(tenantId, { 
  search: 'João',
  limit: 10 
});

// Criar paciente
const patient = await patientConnector.create({
  tenant_id: tenantId,
  id_patient: 'MV12345',
  name: 'João Silva',
  birth_date: '1980-01-01',
  gender: 'M',
  created_by: userId,
});

// Buscar por identificador configurável
const patient = await patientConnector.findByIdPatient('MV12345', tenantId);
```

#### Protocolos e Favoritos

```typescript
// Listar protocolos
const protocols = await protocolConnector.findAll(tenantId);

// Adicionar aos favoritos
await protocolConnector.addToFavorites(userId, protocolId);

// Buscar favoritos do usuário
const favorites = await protocolConnector.findFavorites(userId, tenantId);

// Incrementar uso (para sugestões)
await protocolConnector.incrementUsage(protocolId);
```

#### Planos de Tratamento

```typescript
// Criar plano
const plan = await treatmentPlanConnector.create({
  tenant_id: tenantId,
  patient_id: patientId,
  protocol_id: protocolId,
  status: 'rascunho',
  created_by: userId,
});

// Submeter para aprovação
await treatmentPlanConnector.submitForApproval(planId, tenantId);

// Aprovar
await treatmentPlanConnector.approve(planId, tenantId, approverUserId);

// Rejeitar
await treatmentPlanConnector.reject(planId, tenantId, 'Motivo da rejeição');
```

## Configuração

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Preencha com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Row Level Security (RLS)

Todos os connectors assumem que RLS está habilitado no Supabase. As queries já incluem `tenant_id` para garantir isolamento entre tenants.

Certifique-se de criar policies adequadas no Supabase:

```sql
-- Exemplo: Patients policy
CREATE POLICY "Users can view own tenant patients"
ON patients FOR SELECT
USING (tenant_id = current_setting('app.current_tenant')::uuid);

CREATE POLICY "Users can insert own tenant patients"
ON patients FOR INSERT
WITH CHECK (tenant_id = current_setting('app.current_tenant')::uuid);
```

## Tratamento de Erros

Todos os connectors lançam erros do Supabase diretamente. Use try-catch nas camadas superiores:

```typescript
try {
  const patient = await patientConnector.create(data);
} catch (error) {
  if (error.code === '23505') {
    // Unique violation
    console.error('Paciente já existe');
  } else {
    console.error('Erro ao criar paciente', error);
  }
}
```
