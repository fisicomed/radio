# UX — Experiência do Usuário e Comportamento das Interfaces

Versão: 2.0
Status: Consolidado

---

# 1. Objetivo

Definir:

* comportamento visual;
* fluxo de navegação;
* componentes;
* regras de interação;
* otimizações para velocidade operacional.

Objetivo principal:

Reduzir tempo de preenchimento e minimizar carga cognitiva.

---

# 2. Princípios UX

A interface seguirá:

### Pouca digitação

Priorizar:

* botões;
* chips;
* favoritos;
* templates;
* preenchimento automático.

---

### Progressivo

Mostrar somente o necessário.

Exemplo:

```txt
Região
↓
Sub-região
↓
CID
```

---

### Mobile First

Projetado primeiro para celular:

```txt
390px–430px
```

Desktop:

```txt
layout expandido
```

---

### Uma ação por foco

Evitar múltiplas decisões simultâneas.

---

### Feedback imediato

Toda ação deve gerar resposta visual.

---

# 3. Layout padrão

Estrutura:

```txt
Header
↓
Conteúdo
↓
Ações fixas inferiores
```

Rodapé fixo:

```txt
Voltar

Salvar

Próximo
```

---

# 4. Tela inicial

Componentes:

```txt
Pesquisar paciente
Novo paciente
Filas
Dashboard
```

Busca principal:

```txt
Buscar {{patient_identifier_label}}
```

Exemplos:

```txt
Buscar MV

Buscar Prontuário

Buscar Registro
```

---

# 5. Cadastro de paciente

Estrutura:

```txt
Dados
↓
Clínico
↓
Contato
↓
Revisão
```

Indicador:

```txt
●──●──○──○
```

---

# 6. Etapa 1 — Dados

Campos:

```txt
Identificador paciente

Nome

CPF

Nascimento

Telefone
```

---

Médicos:

Exibir como chips clicáveis:

```txt
[Dr Bruno]

[Dr João]

[Dr Ricardo]

[+]
```

Comportamento:

* mais usados aparecem primeiro;
* primeiro médico padrão selecionado;
* apenas um clique altera.

---

Convênio:

```txt
[SUS]

[Convênio]
```

Comportamento:

```txt
SUS
```

vem selecionado inicialmente.

Ao clicar:

```txt
Convênio
```

Mostrar:

```txt
Unimed

Bradesco

Particular

Outros
```

---

# 7. Etapa 2 — Clínico

Região anatômica:

Primeira camada:

```txt
[Cabeça e Pescoço]

[Mama]

[Tórax]

[Abdome]

[Pelve]

[SNC]

[Coluna]

[Metástase]
```

---

Após selecionar:

Exibir sub-regiões:

Exemplo:

```txt
Mama
```

↓

```txt
[Mama direita]

[Mama esquerda]

[Bilateral]
```

---

Diagnóstico:

Exibir CIDs rápidos:

```txt
[C50 — Mama]

[D05 — Carcinoma in situ]
```

Botão adicional:

```txt
+ Novo CID
```

---

# 8. Aplicação de template

Quando usuário selecionar:

```txt
Mama SUS padrão
```

Exibir carregamento:

Skeleton:

```txt
██████

█████████

██████
```

Mensagem:

```txt
Aplicando protocolo...
```

Após preenchimento:

```txt
✓ Protocolo aplicado
```

---

# 9. Favoritos inteligentes

Ordenar automaticamente:

Exemplo:

Médicos:

```txt
Mais utilizados

Dr Bruno
Dr Ricardo
Dr João
```

---

Aplicável:

* médicos;
* CIDs;
* protocolos;
* convênios;
* acessórios;
* técnicas.

---

# 10. Etapa 3 — Contato

Campos:

```txt
Telefone principal

Telefone secundário

Cidade

Observações
```

---

# 11. Etapa 4 — Revisão

Resumo:

```txt
Paciente

Região

CID

Dose

Frações

Médico

Fluxo
```

Editar:

```txt
ícone lápis
```

---

# 12. Autosave

Durante cadastro:

Salvar automaticamente:

```txt
A cada alteração
```

Indicador:

```txt
Salvando...

✓ Salvo
```

---

# 13. Conflito de edição

Caso outro usuário altere:

Modal:

```txt
Registro atualizado por outro usuário
```

Botões:

```txt
Atualizar

Sobrescrever

Cancelar
```

---

# 14. Tela de paciente

Seções:

```txt
Resumo

Etapas

Prescrição

Arquivos

Timeline
```

---

Resumo:

```txt
Nome

Identificador

Médico

Prioridade

Status
```

---

# 15. Timeline

Exemplo:

```txt
10:23

TC agendada
```

```txt
14:32

Planejamento concluído
```

```txt
16:15

Aprovação realizada
```

---

# 16. Filas operacionais

Exemplo:

```txt
Fila TC
```

Lista:

```txt
1 João

2 Maria

3 Carlos
```

Recursos:

* drag-and-drop;
* filtros;
* busca;
* reordenação manual.

---

# 17. Feedback visual

Sucesso:

```txt
✓ Salvo
```

Erro:

```txt
⚠ Erro ao salvar
```

Alerta:

```txt
⚠ Revisão necessária
```

---

# 18. Estados vazios

Exemplo:

```txt
Nenhum paciente encontrado
```

Botão:

```txt
+ Novo paciente
```

---

# 19. Responsividade

Mobile:

```txt
1 coluna
```

Tablet:

```txt
2 colunas
```

Desktop:

```txt
até 4 colunas
```

---

# 20. Objetivo final

Criar uma interface:

* rápida;
* intuitiva;
* contextual;
* com poucos cliques;
* adequada para ambientes clínicos de alta demanda.
