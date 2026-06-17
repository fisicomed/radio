# Workflow — Fluxos Operacionais e Motor de Protocolos

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* fluxos clínicos;
* etapas;
* dependências;
* protocolos;
* regras condicionais;
* geração automática das etapas do paciente.

Objetivo:

Padronizar o fluxo operacional e reduzir preenchimento manual.

---

# 2. Estrutura geral

Fluxo operacional:

```txt
Paciente
↓
Cadastro
↓
Prescrição
↓
Protocolo
↓
Etapas geradas
↓
Filas operacionais
↓
Tratamento
```

---

# 3. Tipos de fluxo

Existem dois fluxos principais:

---

## Fluxo 2D

Aplicável para tratamentos simples.

Etapas obrigatórias:

```txt
Cadastro
↓
Simulação
↓
Cálculo
↓
Início tratamento
```

Dependências:

| Etapa   | Depende   |
| ------- | --------- |
| Cálculo | Simulação |
| Início  | Cálculo   |

---

## Fluxo Completo

Aplicável para VMAT, IMRT, 3D e técnicas avançadas.

Etapas obrigatórias:

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
Aprovação médica
↓
Início tratamento
```

Dependências:

| Etapa        | Depende      |
| ------------ | ------------ |
| Contorno     | TC           |
| Planejamento | Contorno     |
| Shift        | Planejamento |
| Aprovação    | Shift        |
| Início       | Aprovação    |

---

# 4. Motor de protocolos

Objetivo:

Gerar automaticamente etapas para cada paciente.

Estrutura:

```txt
Protocolo
↓
Etapas
↓
Condições
↓
Paciente
```

---

Exemplo:

```txt
Mama SUS padrão
```

Configuração:

```txt
CID:
C50

Fluxo:
Completo

Técnica:
VMAT

Etapas:

TC
Planejamento
Shift
Aprovação
```

Ao selecionar:

```txt
Mama SUS padrão
```

Sistema cria automaticamente:

```txt
PATIENT_STEPS
```

---

# 5. Templates rápidos

Templates funcionam como preenchimento automático.

Exemplo:

```txt
Mama SUS padrão
```

Preenche:

```txt
Convênio → SUS

Região → Mama

CID → C50

Dose → 50 Gy

Frações → 25

Fluxo → Completo
```

---

# 6. Favoritos inteligentes

Sistema registra frequência de uso.

Exemplo:

Médicos mais usados:

```txt
Dr Bruno
Dr Ricardo
Dr João
```

Exibe:

```txt
Mais utilizados
```

antes da lista completa.

Aplicável para:

* médicos;
* protocolos;
* CIDs;
* técnicas;
* acessórios;
* convênios.

---

# 7. Regras condicionais

Etapas podem ser inseridas automaticamente.

Exemplo:

---

## H&N

Se:

```txt
Região = H&N
```

Adicionar:

```txt
Bucomaxilo
```

Fluxo:

```txt
Cadastro
↓
Bucomaxilo
↓
TC
↓
Planejamento
```

---

## Fiduciais

Se:

```txt
Requer fiduciais = Sim
```

Adicionar:

```txt
Fiduciais
```

---

## RM

Se:

```txt
Requer RM = Sim
```

Adicionar:

```txt
RM
```

---

# 8. Status das etapas

Estados possíveis:

```txt
Pendente

Aguardando

Agendado

Em andamento

Concluído

Cancelado
```

Fluxo:

```txt
Pendente
↓
Agendado
↓
Em andamento
↓
Concluído
```

---

# 9. Filas operacionais

Filas são geradas automaticamente.

Exemplos:

```txt
Fila TC

Fila Planejamento

Fila Shift

Fila Simulação

Fila Bucomaxilo
```

Elegibilidade:

Paciente entra na fila apenas quando:

```txt
Dependências concluídas
```

---

# 10. Ordenação automática

Critérios:

```txt
Prioridade
↓
Tempo espera
↓
Data entrada
```

---

# 11. Reordenação manual

Usuário poderá:

* arrastar;
* alterar ordem;
* remover temporariamente;
* confirmar lista.

Exemplo:

```txt
1 João
2 Maria
3 Carlos
```

↓

```txt
1 Maria
2 João
3 Carlos
```

---

# 12. Confirmação de fila

Ao confirmar:

Sistema poderá:

* definir datas previstas;
* atualizar status;
* gerar eventos timeline.

---

# 13. Dependências bloqueantes

Exemplo:

```txt
Planejamento
```

bloqueado enquanto:

```txt
TC não concluída
```

---

Exemplo:

```txt
Início tratamento
```

bloqueado enquanto:

```txt
Aprovação médica pendente
```

---

# 14. Eventos timeline automáticos

Registrar:

```txt
Paciente criado

Prescrição criada

TC agendada

Planejamento concluído

Aprovação realizada

Tratamento iniciado
```

---

# 15. Salvamento automático

Durante criação:

```txt
Rascunho automático
```

Salvar:

* local;
* servidor.

---

Não aplicar:

```txt
Edições críticas após aprovação
```

---

# 16. Controle de concorrência

Quando dois usuários editarem simultaneamente:

Exibir:

```txt
Registro atualizado por outro usuário
```

Opções:

```txt
Atualizar

Sobrescrever

Cancelar
```

---

# 17. Objetivo final

Construir fluxos que:

* reduzam digitação;
* diminuam erros;
* automatizem etapas;
* acelerem operação clínica;
* permitam expansão futura.
