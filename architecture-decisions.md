# Adaptações e Decisões de Arquitetura

Este documento registra as decisões técnicas, adaptações e simplificações tomadas durante a fase de planejamento para a implementação do sistema de Gestão de Radioterapia.

## 1. Estratégia de Conexão com Backend (Supabase)

### Decisão: Implementação de Camada de Conectores (`connectors`)
Optamos por criar uma camada de abstração entre o Frontend (React) e o Supabase, em vez de chamar o cliente Supabase diretamente nos componentes.

**Vantagens:**
*   **Segurança Centralizada:** Garante que regras de negócio críticas (como filtragem por `tenant_id` e validações de acesso) sejam aplicadas consistentemente antes de qualquer chamada ao banco.
*   **Abstração de Complexidade:** Esconde a complexidade de queries SQL, joins e manipulação de dados brutos. O frontend lida apenas com objetos JavaScript/TypeScript limpos.
*   **Manutenibilidade:** Facilita a troca ou atualização da lógica de backend sem refatorar todo o frontend.
*   **Testabilidade:** Permite mockar facilmente as chamadas de API para testes unitários e de integração.
*   **Padronização:** Uniformiza o tratamento de erros, loading states e respostas da API.

**Estrutura Proposta:**
```text
src/
  connectors/
    supabaseClient.ts      # Instância singleton do cliente Supabase
    auth.ts                # Login, Register, Session, Profile
    patients.ts            # CRUD de pacientes com suporte a ID configurável
    protocols.ts           # CRUD de protocolos e favoritos
    treatments.ts          # Planos de tratamento e workflow de aprovação
    analytics.ts           # Agregação de dados para dashboards
```

---

## 2. Identificador de Paciente Configurável

### Problema
Diferentes clínicas utilizam identificadores diferentes para pacientes (ex: "Número do Prontuário", "Código MV", "CPF", "RG").

### Solução Adotada
*   **Banco de Dados:** A coluna será padronizada como `id_patient` (texto) em todas as tabelas relacionadas.
*   **Configuração do Tenant:** Uma tabela `tenant_settings` armazenará a configuração `patient_id_label` (ex: "Prontuário", "MV").
*   **Frontend:** Os conectores e componentes de UI lerão essa configuração para exibir o rótulo correto nos formulários e tabelas, embora a lógica interna use sempre `id_patient`.

---

## 3. Sistema de Favoritos (Simplificado)

### Problema
A ideia inicial de "Favoritos Inteligentes" (baseados puramente em algoritmos de frequência) poderia adicionar complexidade desnecessária na V1.

### Solução Adotada: Híbrido Manual com Sugestões
*   **Ação Manual:** O usuário clica explicitamente em um ícone de "estrela" para favoritar um protocolo.
*   **Sugestão Passiva:** A lista de seleção de protocolos pode ser ordenada por "Mais Utilizados" (contagem simples de uso no histórico), sugerindo indiretamente os favoritos, mas sem automatizar a ação.
*   **Armazenamento:** Tabela de relação `user_favorites` (user_id, protocol_id).

---

## 4. Segurança e Multitenancy (RLS)

### Diretriz Crítica
O Row Level Security (RLS) do PostgreSQL/Supabase será a **única fonte da verdade** para isolamento de dados.

*   **Política Padrão:** `DENY ALL` por padrão. Todas as políticas devem ser explícitas.
*   **Validação Dupla:** Os conectors no frontend também filtrarão por `tenant_id` como medida de defesa em profundidade e para otimização de queries (evitar trazer dados inúteis), mas a segurança real reside no banco.
*   **Auditoria:** Triggers de auditoria serão implementados no banco para registrar todas as alterações (INSERT, UPDATE, DELETE) em tabelas críticas, independentemente da origem da requisição.

---

## 5. Workflow de Aprovação

### Implementação
Será utilizada uma abordagem baseada em **Máquina de Estados Finita** simples para os Planos de Tratamento.

**Estados:**
1.  `draft` (Rascunho)
2.  `pending_approval` (Em Aprovação)
3.  `approved` / `in_treatment` (Em Tratamento)
4.  `completed` (Concluído)
5.  `rejected` (Rejeitado - volta para draft com comentários)

**Regra de Negócio:** Transições de estado serão validadas tanto no conector (regra de negócio) quanto via RLS (políticas de update baseadas no estado atual e role do usuário).

---

## 6. PWA e Offline (Escopo V1)

### Adaptação
Para garantir a entrega rápida e estabilidade na V1, o modo offline será limitado:
*   **Cache de Leitura:** Estratégias de cache via Service Worker para assets estáticos e dados frequentemente acessados (listas de protocolos, configurações).
*   **Fila de Escrita Simples:** Armazenamento local de ações realizadas offline (ex: registrar sessão) para sincronização quando a conexão retornar.
*   **Sem Conflitos Complexos:** Na V1, em caso de conflito de sincronização, a versão do servidor prevalecerá ou o usuário será notificado para revisão manual.

---

## 7. Stack Tecnológico Confirmado

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | React + Vite | Performance e DX moderno. |
| **Estilização** | Tailwind CSS | Agilidade e consistência visual mobile-first. |
| **Estado Server** | TanStack Query | Gerenciamento robusto de cache, loading e retries. |
| **Formulários** | React Hook Form + Zod | Valiação performática e tipagem segura. |
| **Backend/BaaS** | Supabase (PostgreSQL) | Autenticação, Realtime, RLS e facilidade de deploy. |
| **Lógica de Dados** | Connectors (TS) | Camada de abstração e segurança adicional. |

---

## Próximos Passos

1.  Configurar repositório e ambiente base (Vite + Tailwind).
2.  Implementar scripts SQL iniciais (Schema, RLS básico, Triggers de auditoria).
3.  Desenvolver a camada de `connectors`.
4.  Implementar Autenticação e Layout base.
5.  Desenvolver módulos sequencialmente conforme o backlog.
