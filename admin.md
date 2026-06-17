# Admin — Configurações e Motor Operacional

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* configurações globais;
* tabelas mestres;
* protocolos;
* tempos;
* prioridades;
* usuários;
* comportamento do sistema.

Objetivo:

Permitir alterações operacionais sem necessidade de desenvolvimento.

---

# 2. Estrutura geral

Fluxo:

```txt
Admin
↓
Configurações
↓
Tabelas
↓
Protocolos
↓
Regras
↓
Sistema
```

---

# 3. Dashboard administrativo

Resumo inicial:

Exibir:

```txt
Pacientes ativos

Usuários ativos

Filas pendentes

Protocolos ativos

Tempo médio por etapa
```

---

# 4. Configurações da instituição

Menu:

```txt
Instituição
```

Campos:

| Campo    | Tipo    |
| -------- | ------- |
| Nome     | texto   |
| Logo     | upload  |
| Timezone | seleção |
| Tema     | seleção |
| Idioma   | seleção |

Exemplo:

```txt
Hospital Campinas
```

---

# 5. Configuração do identificador do paciente

Menu:

```txt
Identificador paciente
```

Campos:

| Campo              | Tipo    |
| ------------------ | ------- |
| Nome exibido       | texto   |
| Prefixo            | texto   |
| Máscara            | texto   |
| Geração automática | boolean |

Exemplo:

```txt
Nome:

MV
```

```txt
Prefixo:

MV
```

```txt
Máscara:

###### 
```

Resultado:

```txt
MV-458722
```

ou:

```txt
Prontuário-12345
```

---

# 6. Usuários

Permitir:

```txt
Criar

Editar

Desativar

Resetar senha
```

Campos:

| Campo   | Tipo    |
| ------- | ------- |
| Nome    | texto   |
| Email   | texto   |
| Perfil  | seleção |
| Unidade | seleção |
| Ativo   | boolean |

---

# 7. Unidades

Permitir múltiplas unidades por tenant.

Campos:

| Campo  | Tipo    |
| ------ | ------- |
| Nome   | texto   |
| Cidade | texto   |
| Ativo  | boolean |

Exemplo:

```txt
Centro

Norte

Sul
```

---

# 8. Médicos

Campos:

| Campo         | Tipo    |
| ------------- | ------- |
| Nome          | texto   |
| CRM           | texto   |
| Especialidade | texto   |
| Ativo         | boolean |

Recursos:

```txt
Favoritar

Ordenar

Pesquisar
```

---

# 9. Convênios

Campos:

| Campo  | Tipo    |
| ------ | ------- |
| Nome   | texto   |
| Código | texto   |
| Ativo  | boolean |

Exemplo:

```txt
SUS

Unimed

Bradesco
```

---

# 10. Regiões anatômicas

Campos:

| Campo | Tipo   |
| ----- | ------ |
| Nome  | texto  |
| Ordem | número |

---

Sub-regiões:

Exemplo:

```txt
Mama
```

↓

```txt
Mama direita

Mama esquerda

Bilateral
```

---

# 11. CIDs

Campos:

| Campo     | Tipo    |
| --------- | ------- |
| Código    | texto   |
| Descrição | texto   |
| Frequente | boolean |
| Região    | seleção |

Exemplo:

```txt
C50

Neoplasia maligna da mama
```

---

Recursos:

```txt
Importar CSV

Editar

Pesquisar
```

---

# 12. Protocolos

Objetivo:

Gerar automaticamente etapas.

Campos:

| Campo   | Tipo    |
| ------- | ------- |
| Nome    | texto   |
| Fluxo   | seleção |
| Técnica | seleção |
| Ativo   | boolean |

---

Exemplo:

```txt
Mama SUS padrão
```

---

Etapas:

```txt
TC

Planejamento

Shift

Aprovação
```

---

# 13. Templates rápidos

Permitir:

```txt
Criar

Duplicar

Editar
```

Exemplo:

```txt
Mama SUS padrão
```

Preencher:

```txt
Convênio

CID

Dose

Frações

Fluxo
```

---

# 14. Regras condicionais

Exemplo:

Se:

```txt
Região = H&N
```

Adicionar:

```txt
Bucomaxilo
```

---

Se:

```txt
Requer RM = Sim
```

Adicionar:

```txt
RM
```

---

Se:

```txt
Requer Fiduciais = Sim
```

Adicionar:

```txt
Fiduciais
```

---

# 15. Tempos operacionais

Objetivo:

Calcular duração estimada.

---

Tempo base:

| Procedimento | Tempo  |
| ------------ | ------ |
| TC           | 20 min |
| Simulação    | 15 min |
| Shift        | 10 min |

---

Aditivos:

| Item    | Tempo   |
| ------- | ------- |
| Máscara | +10 min |
| Colchão | +5 min  |
| Poliol  | +8 min  |

---

Resultado:

```txt
TC
20min

Máscara
+10min

Total:
30min
```

---

# 16. Regras de prioridade

Campos:

| Campo        | Tipo    |
| ------------ | ------- |
| CID          | seleção |
| Faixa etária | seleção |
| Prioridade   | número  |

Exemplo:

```txt
C50

idade >60

Prioridade 1
```

---

# 17. Configuração de filas

Permitir:

```txt
Ordenação automática

Tempo limite

Dependências
```

Critérios:

```txt
Prioridade
↓
Tempo espera
↓
Data entrada
```

---

# 18. Auditoria administrativa

Registrar:

```txt
Usuário

Data

Ação

Valor anterior

Valor novo
```

---

Exemplo:

```txt
Admin João

Alterou:

Tempo TC

20min → 30min
```

---

# 19. Importação e exportação

Importar:

```txt
CSV

XLSX
```

Exportar:

```txt
CSV

PDF
```

Itens:

* CIDs;
* médicos;
* protocolos;
* usuários.

---

# 20. Objetivo final

Transformar o Admin em um painel capaz de:

* configurar comportamento;
* reduzir necessidade de código;
* adaptar processos;
* permitir crescimento do sistema.
