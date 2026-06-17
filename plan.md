# Plan — Visão Geral do Produto e Direcionamento Estratégico

Versão: 2.0
Status: Documento mestre
Atualizado: Arquitetura Multitenant

---

# 1. Objetivo

Desenvolver um aplicativo web progressivo (PWA), mobile-first, focado em gestão operacional de pacientes em radioterapia.

O sistema deve reduzir:

* excesso de cliques;
* preenchimento manual;
* retrabalho;
* tempo entre etapas;
* erros operacionais.

O objetivo principal é transformar processos clínicos complexos em fluxos rápidos, intuitivos e rastreáveis.

---

# 2. Princípios do produto

O produto seguirá os princípios:

### Rapidez

Mostrar apenas informações necessárias no momento correto.

---

### Pouca digitação

Priorizar:

* botões clicáveis;
* favoritos;
* templates;
* preenchimento automático;
* seleção contextual.

---

### Contextualização

Exibir opções conforme escolhas anteriores.

Exemplo:

```txt
Região:

Mama

↓

Mostrar:

Mama esquerda
Mama direita
Mama bilateral
```

---

### Mobile First

Todas as telas devem funcionar primeiro em dispositivos móveis.

Desktop será adaptação.

---

### Rastreabilidade

Toda ação relevante deverá possuir:

* usuário;
* data;
* alteração;
* histórico.

---

### Configurável

Comportamentos devem ser alteráveis sem necessidade de código.

---

# 3. Estrutura multitenant

O sistema será preparado desde a V1 para múltiplas instituições.

Estrutura:

```txt
Tenant
↓
Unidade
↓
Usuários
↓
Pacientes
↓
Fluxos
```

Exemplo:

```txt
Hospital A
    ↓
    Unidade Centro

Hospital B
    ↓
    Unidade Norte
```

---

## Estratégia adotada

Modelo:

```txt
Single Database
+
tenant_id
+
RLS
```

Benefícios:

* menor custo;
* fácil manutenção;
* escalabilidade;
* isolamento seguro.

---

# 4. Identificador do paciente

O sistema não utilizará nomenclatura fixa como:

```txt
MV
```

Será configurável por instituição.

Exemplos:

```txt
MV

Prontuário

Registro

ID Paciente
```

Configuração administrativa:

| Campo              | Exemplo |
| ------------------ | ------- |
| Nome               | MV      |
| Prefixo            | MV      |
| Máscara            | ######  |
| Geração automática | Sim     |

---

# 5. Perfis

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

# 6. Fluxos principais

Existem dois fluxos principais:

---

## Fluxo 2D

Aplicável para técnicas simples.

Etapas:

```txt
Cadastro
↓
Simulação
↓
Cálculo
↓
Início tratamento
```

---

## Fluxo Completo

Aplicável para VMAT, 3D e demais técnicas avançadas.

Etapas:

```txt
Cadastro
↓
Fiduciais (condicional)
↓
TC
↓
RM (condicional)
↓
Contorno
↓
Planejamento
↓
Shift
↓
Aprovação
↓
Início tratamento
```

---

# 7. Motor de protocolos

O sistema utilizará protocolos reutilizáveis.

Objetivo:

Gerar etapas automaticamente.

Estrutura:

```txt
Protocolo
↓
Etapas
↓
Dependências
↓
Paciente
```

Exemplo:

```txt
Mama SUS padrão

↓

CID:
C50

↓

Técnica:
VMAT

↓

Etapas:
TC
Planejamento
Shift
```

---

# 8. Templates rápidos

Templates funcionam como preenchimento automático.

Exemplo:

```txt
Mama SUS padrão
```

Preencher:

```txt
Convênio → SUS

Região → Mama

CID → C50

Dose → 50 Gy

Frações → 25
```

---

# 9. Favoritos inteligentes

O sistema poderá sugerir opções mais utilizadas.

Exemplo:

Médicos:

```txt
Dr Bruno

Dr João

Dr Tiago
```

Mais utilizados aparecem primeiro.

---

# 10. Filas operacionais

Filas serão geradas automaticamente.

Exemplos:

```txt
Fila TC

Fila Planejamento

Fila Shift

Fila Simulação
```

Ordenação:

```txt
Prioridade
↓
Tempo espera
↓
Entrada fila
```

---

# 11. Sistema de prioridade

Prioridade calculada automaticamente.

Exemplo:

Critérios:

```txt
CID
+
idade
+
tempo espera
```

Níveis:

```txt
Prioridade 1

Prioridade 2

Prioridade 3
```

---

# 12. Tempos operacionais

Sistema deverá calcular duração estimada.

Estrutura:

```txt
Tempo base
+
Aditivos
```

Exemplo:

```txt
TC

20 min

Máscara

+10 min

Total:

30 min
```

---

# 13. Indicadores iniciais

V1:

```txt
Pacientes atrasados

Pacientes por etapa

Tempo médio planejamento
```

---

# 14. Segurança

Requisitos:

* autenticação;
* RBAC;
* RLS;
* auditoria;
* criptografia;
* LGPD.

---

# 15. Stack inicial

Frontend:

```txt
React
Vite
Tailwind
```

Backend:

```txt
Supabase
PostgreSQL
```

Aplicação:

```txt
PWA
```

---

# 16. Objetivo da V1

Entregar:

```txt
Cadastro
+
Prescrição
+
Protocolos
+
Filas
+
Admin
+
Dashboard
+
PWA
```

---

# 17. Evoluções futuras

V2:

```txt
Notificações

Integração sistemas externos

Templates condicionais

Analytics avançado
```

---

V3:

```txt
IA

Predição gargalos

Sugestões automáticas

BI avançado
```

---

# 18. Objetivo final

Construir uma plataforma operacional de radioterapia capaz de:

* acelerar processos;
* reduzir erros;
* padronizar fluxos;
* escalar para múltiplas instituições;
* manter rastreabilidade e segurança.
