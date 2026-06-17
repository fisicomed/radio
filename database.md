# Security & LGPD — Segurança, Privacidade e Conformidade

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* proteção de dados;
* controle de acesso;
* auditoria;
* privacidade;
* requisitos LGPD;
* segurança operacional.

Objetivo:

Garantir segurança clínica e conformidade legal desde a primeira versão.

---

# 2. Princípios

O sistema deve ser:

* seguro por padrão;
* mínimo privilégio;
* auditável;
* rastreável;
* multitenant;
* preparado para LGPD.

---

# 3. Classificação dos dados

Categorias:

| Tipo                  | Exemplos             |
| --------------------- | -------------------- |
| Dados públicos        | nome instituição     |
| Dados pessoais        | nome, telefone       |
| Dados sensíveis       | CID, diagnóstico     |
| Dados críticos        | prescrição, dose     |
| Dados administrativos | usuários, permissões |

---

# 4. Multitenancy e isolamento

Estratégia:

```txt
Single Database
+
tenant_id
+
RLS
```

Estrutura:

```txt
Tenant
↓
Unidade
↓
Usuário
↓
Dados
```

---

Todo registro deve conter:

```txt
tenant_id
```

Exemplo:

```txt
PATIENTS

PRESCRIPTIONS

FILES

AUDIT_LOG
```

---

# 5. Row Level Security (RLS)

Aplicar:

```txt
PostgreSQL RLS
```

Exemplo:

```sql
tenant_id =
auth.jwt()->>'tenant_id'
```

---

Objetivo:

Impedir acesso a dados de outras instituições.

---

# 6. Autenticação

Tecnologia:

```txt
Supabase Auth
```

Métodos:

```txt
Email + senha

Magic Link

SSO (futuro)
```

---

Fluxo:

```txt
Login
↓
JWT
↓
Claims
↓
Permissões
```

---

Claims:

```json
{
   "user_id":"123",
   "tenant_id":"abc",
   "unit_id":"xyz",
   "role":"dosimetrista"
}
```

---

# 7. Controle de acesso

Modelo:

```txt
RBAC
```

Perfis:

```txt
Admin

Secretária

Dosimetrista

Enfermeiro

Técnico

Médico
```

---

Permissões:

* leitura;
* criação;
* edição;
* aprovação;
* exclusão.

---

# 8. Princípio do menor privilégio

Usuário recebe apenas acesso necessário.

Exemplo:

Secretária:

```txt
✓ Cadastro

✓ Agendamento

✗ Prescrição

✗ Aprovação médica
```

---

# 9. Criptografia

Dados em trânsito:

```txt
HTTPS TLS
```

---

Dados armazenados:

```txt
AES-256
```

---

Aplicável:

```txt
Arquivos

Backups

Dados sensíveis
```

---

# 10. Auditoria

Registrar:

```txt
Usuário

Ação

Data

IP

Valor anterior

Valor novo
```

---

Exemplo:

```txt
Maria

Alterou:

Dose

50Gy → 60Gy
```

---

# 11. Audit Log

Estrutura:

```txt
AUDIT_LOG
```

Campos:

| Campo          | Tipo      |
| -------------- | --------- |
| id             | uuid      |
| tenant_id      | uuid      |
| user_id        | uuid      |
| entity         | texto     |
| entity_id      | uuid      |
| action         | texto     |
| previous_value | json      |
| new_value      | json      |
| created_at     | timestamp |

---

# 12. Timeline do paciente

Registrar:

```txt
Paciente criado

TC agendada

Dose alterada

Aprovação realizada

Tratamento iniciado
```

---

# 13. Sessões

Regras:

Tempo máximo:

```txt
8 horas
```

Inatividade:

```txt
30 minutos
```

Após:

```txt
Logout automático
```

---

# 14. Bloqueio de edição crítica

Após aprovação médica:

Bloquear:

```txt
Dose

Frações

Técnica
```

---

Exibir:

```txt
Prescrição aprovada
```

---

Permitir:

```txt
Solicitar reabertura
```

---

# 15. Fluxo de reabertura

Objetivo:

Evitar alterações críticas sem rastreabilidade.

---

Fluxo:

```txt
Usuário
↓
Solicitar reabertura
↓
Médico/Admin
↓
Aprovar
↓
Liberar edição
```

---

Registrar:

```txt
Motivo

Usuário

Data
```

---

# 16. Soft delete

Evitar exclusão física.

Estrutura:

```txt
deleted_at
deleted_by
```

---

Fluxo:

```txt
Excluir
↓
Arquivar
```

---

# 17. Backup

Estratégia:

Backups:

```txt
Diário

Semanal

Mensal
```

Retenção:

```txt
90 dias
```

---

# 18. Retenção de logs

AUDIT_LOG:

```txt
5 anos
```

---

Timeline:

```txt
5 anos
```

---

# 19. Exportação de dados

Permitir:

```txt
CSV

PDF

JSON
```

---

Aplicável:

```txt
Paciente

Prescrição

Relatórios
```

---

# 20. LGPD — Direitos do titular

Permitir:

```txt
Consultar dados

Exportar dados

Corrigir dados

Solicitar exclusão
```

---

Exclusão:

```txt
Soft delete
```

para preservar integridade clínica.

---

# 21. Consentimento

Opcional na V1.

Estrutura:

```txt
Aceito compartilhamento
```

Registrar:

```txt
Data

IP

Versão termo
```

---

# 22. Monitoramento

Ferramenta sugerida:

```txt
Sentry
```

Monitorar:

```txt
Erros

Falhas

Exceções

Performance
```

---

# 23. Objetivo final

Construir uma plataforma:

* segura;
* auditável;
* compatível com LGPD;
* preparada para múltiplas instituições;
* adequada para ambiente clínico.
