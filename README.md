# Teste G4F Frontend

Frontend em Next.js para o sistema de gerenciamento de notícias e busca de CEPs.

## Descrição

Aplicação frontend desenvolvida com Next.js 15 que oferece funcionalidades de:
- Gerenciamento de notícias (CRUD completo)
- Busca de CEPs através de API externa
- Autenticação de usuários (login e registro)
- Proteção de rotas com middleware e guards

## Stack Tecnológica

- **Next.js 15.5** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** - Estilização
- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Sonner** - Notificações toast
- **Material-UI** - Componentes UI
- **Cypress** - Testes end-to-end

## Pré-requisitos

- **Node.js** 18 ou superior
- **NPM** ou **Yarn**
- **Docker** (opcional, para execução via container)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd teste-g4f-frontend
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**Variáveis de ambiente:**
- `NEXT_PUBLIC_API_BASE_URL` - URL base da API backend (padrão: http://localhost:3000)

## Execução Local

### Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3001**

### Produção

1. Gere o build de produção:
```bash
npm run build
```

2. Inicie o servidor de produção:
```bash
npm start
```

## Execução com Docker

```bash
docker compose up -d
```

A aplicação estará disponível em: **http://localhost:3001**

Para parar os containers:
```bash
docker compose down
```

## Testes

### Testes End-to-End (Cypress)

**Abrir interface do Cypress:**
```bash
npm run cypress:open
```

**Executar testes em modo headless:**
```bash
npm run cypress:run
```

ou

```bash
npm run test:e2e
```

Os testes estão localizados em: `cypress/e2e/`

## Estrutura de Pastas

```
teste-g4f-frontend/
├── app/                      # Rotas Next.js (App Router)
│   ├── (public)/             # Rotas públicas (não requerem autenticação)
│   │   ├── login/            # Página de login
│   │   └── register/         # Página de registro
│   ├── (auth)/               # Rotas autenticadas (protegidas)
│   │   ├── cep/              # Busca de CEP
│   │   ├── home/             # Dashboard/home
│   │   └── news/             # CRUD de notícias
│   │       ├── [id]/edit/    # Editar notícia
│   │       └── new/          # Criar notícia
│   ├── layout.tsx            # Layout raiz
│   └── globals.css           # Estilos globais
│
├── src/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── ui/               # Componentes UI base (Button, Input, Card, etc)
│   │   ├── auth-guard.tsx   # Guard de autenticação (client-side)
│   │   └── header.tsx        # Cabeçalho da aplicação
│   ├── contexts/             # Context API (estado global)
│   │   └── auth.context.tsx  # Contexto de autenticação
│   ├── hooks/                # Custom hooks
│   │   └── use-news.ts       # Hooks para gerenciamento de notícias
│   ├── lib/                  # Utilitários e helpers
│   │   ├── http.ts           # Cliente Axios configurado
│   │   ├── cn.ts             # Utilitário para class names
│   │   └── cep.utils.ts      # Utilitários para CEP
│   ├── providers/            # Providers React
│   │   └── react-query-provider.tsx  # Provider do TanStack Query
│   ├── services/             # Camada de serviços (API)
│   │   ├── auth.service.ts   # Serviço de autenticação
│   │   ├── cep.service.ts    # Serviço de busca de CEP
│   │   └── news.service.ts   # Serviço de notícias
│   └── types/                # Definições TypeScript
│       ├── auth.ts           # Tipos de autenticação
│       ├── cep.ts            # Tipos de CEP
│       └── news.ts           # Tipos de notícias
│
├── cypress/                  # Testes E2E
│   ├── e2e/                  # Testes end-to-end
│   └── support/              # Comandos e configurações do Cypress
│
├── public/                    # Arquivos estáticos
│
├── middleware.ts             # Middleware Next.js (proteção de rotas SSR)
├── Dockerfile                # Dockerfile multi-stage otimizado
├── docker-compose.yml        # Configuração Docker Compose
└── .dockerignore            # Arquivos ignorados no build Docker
```

### Justificativa da Estrutura

**App Router (`app/`):**
- Utiliza o novo sistema de roteamento do Next.js 15
- Route Groups `(public)` e `(auth)` organizam rotas por nível de acesso
- Facilita a proteção de rotas via middleware

**Separação `src/`:**
- Mantém o código fonte organizado e separado de configurações
- Facilita a manutenção e escalabilidade
- Padrão comum em projetos Next.js

**Camadas de arquitetura:**
- **Components**: Componentes reutilizáveis e específicos
- **Services**: Abstração da comunicação com API
- **Hooks**: Lógica reutilizável com React Query
- **Contexts**: Estado global da aplicação
- **Types**: Tipagem forte com TypeScript

**Separação por funcionalidade:**
- Cada módulo (auth, news, cep) tem seus próprios services, types e componentes
- Facilita a manutenção e adição de novas funcionalidades

## Padrões de Código

### ESLint

O projeto utiliza **ESLint** com a configuração do Next.js:

```bash
npm run lint
```

**Configuração:**
- Base: `eslint-config-next` (Next.js 15.5)
- Regras do Next.js para React e TypeScript
- Validação automática de imports e hooks

### TypeScript

- **Strict mode** habilitado
- Tipagem forte em todos os arquivos
- Interfaces e types definidos em `src/types/`
- Sem `any` explícito (quando possível)

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`Button.tsx`, `AuthGuard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`use-news.ts`)
- **Services**: camelCase com sufixo `Service` (`auth.service.ts`)
- **Types**: camelCase (`auth.ts`, `news.ts`)
- **Utils**: camelCase com sufixo `utils` (`cep.utils.ts`)

### Formatação

O projeto não possui Prettier configurado, mas segue as convenções do Next.js:
- 2 espaços para indentação
- Aspas simples para strings
- Ponto e vírgula no final das linhas
- Quebra de linha automática do ESLint

## Funcionalidades

### Autenticação
- ✅ Login de usuários
- ✅ Registro de novos usuários
- ✅ Logout
- ✅ Proteção de rotas (middleware SSR + AuthGuard CSR)
- ✅ Armazenamento de token JWT no localStorage

### Notícias (CRUD)
- ✅ Listar todas as notícias
- ✅ Criar nova notícia
- ✅ Editar notícia existente
- ✅ Deletar notícia
- ✅ Visualização detalhada

### Busca de CEP
- ✅ Consulta de CEP através de API externa
- ✅ Validação de formato de CEP
- ✅ Exibição de dados do endereço

## Páginas

### Rotas Públicas
- `/login` - Página de login
- `/register` - Página de registro

### Rotas Autenticadas
- `/home` - Dashboard/home
- `/news` - Lista de notícias
- `/news/new` - Criar nova notícia
- `/news/[id]/edit` - Editar notícia
- `/cep` - Busca de CEP

## Integração com Backend

O frontend se comunica com o backend através de API REST:

- **Base URL**: Configurável via `NEXT_PUBLIC_API_BASE_URL` (padrão: `http://localhost:3000`)
- **Autenticação**: JWT via header `Authorization: Bearer {token}`
- **Storage**: Token armazenado no `localStorage`
- **Interceptors**: Axios configurado para adicionar token automaticamente

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (porta 3001)
npm run build        # Build de produção
npm run start        # Servidor de produção (porta 3001)
npm run lint         # Executar ESLint
npm run cypress:open # Abrir interface do Cypress
npm run cypress:run  # Executar testes E2E em modo headless
npm run test:e2e     # Alias para cypress:run
```

## Troubleshooting

### Erro de conexão com API
- Verifique se o backend está rodando
- Confirme a URL em `NEXT_PUBLIC_API_BASE_URL`
- Verifique CORS no backend
