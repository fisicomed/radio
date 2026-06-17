# Permissions — Controle de Acesso e Permissões

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* perfis;
* permissões;
* escopos;
* regras de acesso;
* RLS;
* bloqueios operacionais.

Objetivo principal:

Garantir que cada usuário visualize e altere apenas informações necessárias para sua função.

---

# 2. Modelo de autorização

Estrutura:

```txt
Usuário
↓
Tenant
↓
Unidade
↓
Perfil
↓
Permissões
↓
RLS
```

---

# 3. Princípios

O sistema seguirá:

### Menor privilégio

Usuário acessa apenas o necessário.

---

### Isolamento institucional

Usuários nunca acessam dados de outro tenant.

---

### Rastreabilidade

Toda alteração relevante:

* registra usuário;
* registra data;
* registra ação.

---

### Controle por etapa

Permissões dependem:

* do perfil;
* da etapa;
* do status.

---

# 4. Perfis

Perfis iniciais:

| Perfil       | Função                    |
| ------------ | ------------------------- |
| Secretária   | Cadastro e comunicação    |
| Dosimetrista | Prescrição e planejamento |
| Enfermeiro   | Consulta e liberações     |
| Técnico      | Fiduciais                 |
| Médico       | Aprovação                 |
| Admin        | Configuração              |

---

# 5. Escopo de acesso

Níveis:

| Escopo  | Descrição                     |
| ------- | ----------------------------- |
| Tenant  | Toda instituição              |
| Unidade | Apenas unidade específica     |
| Próprio | Apenas registros relacionados |

Exemplo:

Secretária:

```txt
Hospital A
↓
Unidade Centro
↓
Visualiza pacientes da unidade
```

Não pode:

```txt
Hospital B
```

---

# 6. RLS (Row Level Security)

Regra padrão:

```sql
tenant_id = auth.jwt()->>'tenant_id'
```

Escopo adicional por unidade:

```sql
unit_id = auth.jwt()->>'unit_id'
```

---

# 7. Matriz principal de permissões

| Ação             | Secretária | Dosimetrista | Enfermeiro | Técnico | Médico | Admin |
| ---------------- | ---------- | ------------ | ---------- | ------- | ------ | ----- |
| Criar paciente   | ✅          | ✅            | ❌          | ❌       | ❌      | ✅     |
| Editar paciente  | ✅          | ✅            | ❌          | ❌       | ❌      | ✅     |
| Excluir paciente | ❌          | ❌            | ❌          | ❌       | ❌      | ✅     |
| Ver paciente     | ✅          | ✅            | ✅          | ✅       | ✅      | ✅     |
| Upload arquivos  | ✅          | ✅            | ✅          | ✅       | ✅      | ✅     |

---

# 8. Permissões clínicas

| Ação               | Secretária | Dosimetrista | Enfermeiro | Técnico | Médico | Admin |
| ------------------ | ---------- | ------------ | ---------- | ------- | ------ | ----- |
| Criar prescrição   | ❌          | ✅            | ❌          | ❌       | ✅      | ✅     |
| Editar prescrição  | ❌          | ✅            | ❌          | ❌       | ✅      | ✅     |
| Aprovar prescrição | ❌          | ❌            | ❌          | ❌       | ✅      | ✅     |
| Solicitar revisão  | ❌          | ✅            | ❌          | ❌       | ✅      | ✅     |
| Reabrir prescrição | ❌          | ❌            | ❌          | ❌       | ✅      | ✅     |

---

# 9. Permissões por etapa

| Etapa               | Secretária | Dosimetrista | Enfermeiro | Técnico | Médico |
| ------------------- | ---------- | ------------ | ---------- | ------- | ------ |
| Cadastro            | ✅          | ✅            | ❌          | ❌       | ❌      |
| Prescrição          | ❌          | ✅            | ❌          | ❌       | ✅      |
| Consulta enfermagem | ❌          | ❌            | ✅          | ❌       | ❌      |
| Bucomaxilo          | ❌          | ❌            | ✅          | ❌       | ❌      |
| Fiduciais           | ❌          | ❌            | ❌          | ✅       | ❌      |
| TC                  | ❌          | ✅            | ❌          | ❌       | ❌      |
| RM                  | ❌          | ✅            | ❌          | ❌       | ❌      |
| Planejamento        | ❌          | ✅            | ❌          | ❌       | ❌      |
| Shift               | ❌          | ✅            | ❌          | ❌       | ❌      |
| Aprovação           | ❌          | ❌            | ❌          | ❌       | ✅      |

---

# 10. Bloqueios automáticos

Após aprovação:

Campos bloqueados:

```txt
CID
Técnica
Dose
Frações
Fases
```

---

Fluxo:

```txt
Em edição
↓
Aprovado
↓
Bloqueado
```

---

# 11. Fluxo de revisão

Quando houver necessidade de alteração:

```txt
Aprovado
↓
Solicitar revisão
↓
Motivo obrigatório
↓
Aprovação reabertura
↓
Editar
↓
Nova aprovação
```

---

# 12. PRESCRIPTION_REVISIONS

Estrutura:

| Campo           | Tipo      |
| --------------- | --------- |
| id              | uuid      |
| prescription_id | uuid      |
| solicitante_id  | uuid      |
| motivo          | text      |
| status          | text      |
| aprovado_por    | uuid      |
| data_aprovacao  | timestamp |

---

# 13. Permissões administrativas

Somente Admin:

Pode alterar:

```txt
Protocolos

Tempos

Prioridades

Usuários

Configurações

Tenant

Unidades
```

---

# 14. Permissão identificador paciente

Controle específico:

| Ação                 | Secretária | Admin |
| -------------------- | ---------- | ----- |
| Editar identificador | ❌          | ✅     |

Motivo:

Evitar inconsistências.

---

# 15. Permissões arquivos

| Tipo arquivo  | Secretária | Dosimetrista | Médico |
| ------------- | ---------- | ------------ | ------ |
| Documento     | ✅          | ✅            | ✅      |
| Pedido médico | ✅          | ✅            | ✅      |
| TC            | ❌          | ✅            | ✅      |
| RM            | ❌          | ✅            | ✅      |

---

# 16. Auditoria obrigatória

Registrar:

* login;
* logout;
* criação;
* edição;
* exclusão;
* aprovação;
* revisão;
* reabertura.

---

# 17. Objetivo final

Garantir:

* isolamento entre instituições;
* segurança operacional;
* rastreabilidade;
* controle clínico;
* conformidade LGPD.
