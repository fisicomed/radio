# Radio Manager

Sistema de Gestão de Radioterapia Multitenant

## Stack Tecnológica

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **State Management**: TanStack Query + React Context
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **PWA**: Service Workers + Manifest

## Estrutura do Projeto

```
src/
├── connectors/          # Camada de acesso ao Supabase
│   ├── supabase.ts      # Cliente Supabase
│   ├── auth.ts          # Autenticação
│   ├── patients.ts      # Pacientes
│   ├── protocols.ts     # Protocolos
│   └── treatmentPlans.ts # Planos de Tratamento
├── context/             # Contextos React
│   └── AuthContext.tsx  # Autenticação
├── types/               # Tipos TypeScript
│   ├── index.ts         # Tipos principais
│   └── database.ts      # Schema do banco
├── components/          # Componentes reutilizáveis
├── pages/               # Páginas da aplicação
├── hooks/               # Hooks customizados
├── utils/               # Utilitários
└── App.tsx              # Componente principal
```

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Copie o arquivo de exemplo e configure suas variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

4. Edite `.env` com suas credenciais do Supabase:
   ```
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Lint do código

## Próximos Passos

1. Configurar schema do banco no Supabase
2. Implementar RLS policies
3. Desenvolver CRUD de pacientes
4. Implementar gestão de protocolos
5. Criar workflow de aprovação de planos
6. Adicionar analytics e dashboard
7. Implementar recursos PWA offline

## License

MIT
