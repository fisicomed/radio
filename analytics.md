# Analytics — Indicadores, Métricas e Dashboard Operacional

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* indicadores operacionais;
* métricas clínicas;
* dashboards;
* filtros;
* visão gerencial.

Objetivo:

Transformar dados operacionais em informações acionáveis.

---

# 2. Princípios

Indicadores devem ser:

* simples;
* acionáveis;
* rápidos;
* objetivos;
* relevantes.

Evitar:

* excesso de gráficos;
* indicadores sem ação prática;
* dashboards complexos na V1.

---

# 3. Estrutura

Fluxo:

```txt
Eventos
↓
Banco
↓
Views
↓
Dashboard
↓
Usuário
```

---

# 4. Escopo dos dashboards

Níveis:

| Nível          | Escopo       |
| -------------- | ------------ |
| Operacional    | Equipe       |
| Gerencial      | Coordenação  |
| Administrativo | Instituição  |
| Global         | Multi-tenant |

---

# 5. Filtros globais

Disponíveis:

```txt
Tenant

Unidade

Médico

Período

Convênio

Região

Fluxo

Status
```

Exemplo:

```txt
Hospital Campinas
↓
Unidade Centro
↓
Últimos 30 dias
```

---

# 6. Dashboard operacional (V1)

Indicadores principais:

---

### Pacientes por etapa

Exemplo:

```txt
Cadastro: 12

TC: 25

Planejamento: 8

Shift: 4

Tratamento: 31
```

Objetivo:

Identificar gargalos.

---

### Tempo médio por etapa

Exemplo:

```txt
TC

2 dias
```

```txt
Planejamento

4 dias
```

```txt
Shift

1 dia
```

Objetivo:

Detectar atrasos.

---

### Pacientes atrasados

Critério:

```txt
Data prevista
<
Hoje
```

Exemplo:

```txt
TC atrasado

5 pacientes
```

Objetivo:

Atuação rápida.

---

# 7. Dashboard gerencial

Indicadores:

---

### Pacientes por médico

Exemplo:

```txt
Dr Bruno

45 pacientes
```

```txt
Dr Ricardo

27 pacientes
```

---

### Pacientes por convênio

Exemplo:

```txt
SUS

60%
```

```txt
Convênio

30%
```

```txt
Particular

10%
```

---

### Distribuição por região anatômica

Exemplo:

```txt
Mama

35%
```

```txt
H&N

20%
```

```txt
Pelve

15%
```

---

# 8. Dashboard filas

Indicadores:

---

### Tempo médio em fila

Exemplo:

```txt
Fila TC

1.5 dias
```

```txt
Fila Planejamento

3 dias
```

---

### Tamanho das filas

Exemplo:

```txt
Fila TC

15 pacientes
```

---

### Pacientes aguardando prioridade alta

Exemplo:

```txt
Prioridade 1

7 pacientes
```

---

# 9. Dashboard produtividade

Indicadores:

---

### Procedimentos realizados

Exemplo:

```txt
TC

125
```

```txt
Planejamentos

87
```

---

### Tempo médio por procedimento

Exemplo:

```txt
TC

30 min
```

---

### Utilização da equipe

Exemplo:

```txt
Dosimetrista

75%
```

```txt
Enfermagem

62%
```

---

# 10. Dashboard clínico

Indicadores:

---

### Pacientes por CID

Exemplo:

```txt
C50

30 pacientes
```

---

### Pacientes por fluxo

Exemplo:

```txt
2D

25%
```

```txt
Completo

75%
```

---

### Pacientes por prioridade

Exemplo:

```txt
Prioridade 1

15
```

```txt
Prioridade 2

40
```

---

# 11. Indicadores SLA

Exemplo:

Tempo:

```txt
Cadastro
↓
Início tratamento
```

Resultado:

```txt
7 dias
```

---

Outros:

```txt
Tempo TC → Planejamento

Tempo Planejamento → Início
```

---

# 12. Alertas automáticos

Gerar alertas quando:

```txt
Tempo médio > limite
```

ou:

```txt
Fila > capacidade
```

ou:

```txt
Paciente prioridade alta atrasado
```

Exemplo:

```txt
⚠ Planejamento acima do limite
```

---

# 13. Estrutura técnica V1

Implementação:

```txt
PostgreSQL Views
```

Exemplo:

```sql
patients_per_stage

avg_stage_time

late_patients
```

---

# 14. Evolução futura

V2:

```txt
Metabase
```

---

V3:

```txt
Power BI

IA

Predição gargalos

Sugestão automática
```

---

# 15. Auditoria analytics

Registrar:

```txt
Relatório acessado

Filtros usados

Exportações
```

---

# 16. Exportação

Permitir:

```txt
CSV

PDF

XLSX
```

---

# 17. Objetivo final

Construir indicadores que:

* mostrem gargalos;
* reduzam atrasos;
* melhorem decisões;
* aumentem produtividade;
* permitam escalar a operação.
