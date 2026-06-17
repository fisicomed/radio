# Database — Modelagem de Dados

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* entidades;
* relacionamentos;
* regras estruturais;
* padrões de auditoria;
* suporte multitenant.

Objetivo:

Criar uma estrutura escalável, flexível e preparada para evolução futura.

---

# 2. Princípios

A modelagem deve ser:

* relacional;
* auditável;
* extensível;
* multi-tenant;
* segura;
* preparada para alta rastreabilidade.

---

# 3. Estrutura global

Hierarquia:

```txt
Tenant
↓
Unidade
↓
Usuário
↓
Paciente
↓
Processos
```

---

# 4. Campos padrão

Toda tabela operacional deve possuir:

| Campo      | Tipo      |
| ---------- | --------- |
| id         | uuid      |
| tenant_id  | uuid      |
| created_at | timestamp |
| updated_at | timestamp |
| deleted_at | timestamp |
| created_by | uuid      |
| updated_by | uuid      |

---

# 5. TENANTS

Instituições cadastradas.

Campos:

| Campo    | Tipo    |
| -------- | ------- |
| id       | uuid    |
| name     | text    |
| logo_url | text    |
| active   | boolean |

---

# 6. UNITS

Unidades pertencentes ao tenant.

Campos:

| Campo     | Tipo    |
| --------- | ------- |
| id        | uuid    |
| tenant_id | uuid    |
| name      | text    |
| city      | text    |
| active    | boolean |

---

Relacionamento:

```txt
TENANTS
1:N
UNITS
```

---

# 7. USERS

Campos:

| Campo     | Tipo    |
| --------- | ------- |
| id        | uuid    |
| tenant_id | uuid    |
| unit_id   | uuid    |
| name      | text    |
| email     | text    |
| role      | text    |
| active    | boolean |

---

Perfis:

```txt
admin
secretaria
dosimetrista
enfermeiro
tecnico
medico
```

---

# 8. SETTINGS

Configurações por tenant.

Campos:

| Campo                     | Tipo |
| ------------------------- | ---- |
| id                        | uuid |
| tenant_id                 | uuid |
| patient_identifier_name   | text |
| patient_identifier_prefix | text |
| patient_identifier_mask   | text |
| timezone                  | text |

---

Exemplo:

```txt
Nome:

MV
```

ou:

```txt
Prontuário
```

---

# 9. PATIENTS

Campos:

| Campo              | Tipo    |
| ------------------ | ------- |
| id                 | uuid    |
| tenant_id          | uuid    |
| unit_id            | uuid    |
| patient_identifier | text    |
| name               | text    |
| cpf                | text    |
| birth_date         | date    |
| phone              | text    |
| city               | text    |
| insurance_id       | uuid    |
| physician_id       | uuid    |
| priority           | integer |
| status             | text    |

---

Status:

```txt
rascunho
ativo
alta
arquivado
```

---

# 10. INSURANCES

Campos:

| Campo     | Tipo    |
| --------- | ------- |
| id        | uuid    |
| tenant_id | uuid    |
| name      | text    |
| active    | boolean |

---

# 11. PHYSICIANS

Campos:

| Campo     | Tipo |
| --------- | ---- |
| id        | uuid |
| tenant_id | uuid |
| name      | text |
| crm       | text |
| specialty | text |

---

# 12. REGIONS

Campos:

| Campo      | Tipo    |
| ---------- | ------- |
| id         | uuid    |
| tenant_id  | uuid    |
| name       | text    |
| sort_order | integer |

---

# 13. SUB_REGIONS

Campos:

| Campo     | Tipo |
| --------- | ---- |
| id        | uuid |
| region_id | uuid |
| name      | text |

---

# 14. CIDS

Campos:

| Campo       | Tipo    |
| ----------- | ------- |
| id          | uuid    |
| tenant_id   | uuid    |
| code        | text    |
| description | text    |
| frequent    | boolean |

---

# 15. CID_REGION

Tabela N:N

Campos:

| Campo     | Tipo |
| --------- | ---- |
| cid_id    | uuid |
| region_id | uuid |

---

# 16. PROTOCOLS

Campos:

| Campo     | Tipo    |
| --------- | ------- |
| id        | uuid    |
| tenant_id | uuid    |
| name      | text    |
| flow_type | text    |
| technique | text    |
| active    | boolean |

---

Tipos:

```txt
2D
completo
```

---

# 17. PROTOCOL_STAGES

Etapas do protocolo.

Campos:

| Campo             | Tipo    |
| ----------------- | ------- |
| id                | uuid    |
| protocol_id       | uuid    |
| name              | text    |
| order_number      | integer |
| responsible_role  | text    |
| estimated_minutes | integer |

---

# 18. PRESCRIPTIONS

Campos:

| Campo       | Tipo    |
| ----------- | ------- |
| id          | uuid    |
| patient_id  | uuid    |
| cid_id      | uuid    |
| region_id   | uuid    |
| protocol_id | uuid    |
| technique   | text    |
| total_dose  | numeric |
| fractions   | integer |
| daily_dose  | numeric |
| requires_rm | boolean |

---

# 19. PRESCRIPTION_PHASES

Permite múltiplas fases.

Exemplo:

```txt
Fase 1

50Gy / 25
```

```txt
Fase 2

10Gy / 5
```

Campos:

| Campo           | Tipo    |
| --------------- | ------- |
| id              | uuid    |
| prescription_id | uuid    |
| phase_name      | text    |
| total_dose      | numeric |
| fractions       | integer |
| daily_dose      | numeric |

---

# 20. PATIENT_STAGES

Etapas reais do paciente.

Campos:

| Campo               | Tipo      |
| ------------------- | --------- |
| id                  | uuid      |
| patient_id          | uuid      |
| protocol_stage_id   | uuid      |
| status              | text      |
| scheduled_date      | timestamp |
| completed_date      | timestamp |
| responsible_user_id | uuid      |

---

Status:

```txt
pendente
em_andamento
concluido
cancelado
```

---

# 21. FIDUCIALS

Campos:

| Campo           | Tipo    |
| --------------- | ------- |
| id              | uuid    |
| patient_id      | uuid    |
| mask            | boolean |
| vacuum_mattress | boolean |
| bolus           | boolean |
| poliol          | boolean |

---

# 22. FILES

Campos:

| Campo        | Tipo |
| ------------ | ---- |
| id           | uuid |
| patient_id   | uuid |
| storage_path | text |
| file_type    | text |

---

# 23. PATIENT_TIMELINE

Campos:

| Campo       | Tipo |
| ----------- | ---- |
| id          | uuid |
| patient_id  | uuid |
| event_type  | text |
| description | text |
| created_by  | uuid |

---

# 24. AUDIT_LOG

Campos:

| Campo          | Tipo  |
| -------------- | ----- |
| id             | uuid  |
| tenant_id      | uuid  |
| user_id        | uuid  |
| entity         | text  |
| entity_id      | uuid  |
| action         | text  |
| previous_value | jsonb |
| new_value      | jsonb |

---

# 25. Relacionamento principal

```txt
TENANT
 ↓
UNITS
 ↓
USERS
 ↓
PATIENTS
 ↓
PRESCRIPTIONS
 ↓
PATIENT_STAGES
```

---

# 26. Índices sugeridos

Criar índices para:

```sql
patient_identifier
tenant_id
status
priority
created_at
cid_id
patient_id
```

---

# 27. Objetivo final

Criar uma estrutura:

* preparada para múltiplas instituições;
* auditável;
* altamente rastreável;
* flexível;
* preparada para crescimento.
