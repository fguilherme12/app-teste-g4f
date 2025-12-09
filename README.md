# Teste G4F Frontend

Frontend em Next.js para o sistema de gerenciamento de usuários.

## Stack

- Next.js 15.5 (App Router)
- React 19
- TypeScript
- TailwindCSS
- TanStack Query (React Query)
- Axios
- Sonner (Toast notifications)
- Lucide Icons

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## Executar

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3001

## Estrutura

```
├── app/                      # Rotas Next.js (App Router)
│   ├── (public)/             # Rotas públicas
│   │   ├── login/            # Página de login
│   │   └── register/         # Página de registro
│   ├── (auth)/               # Rotas autenticadas
│   │   └── users/            # CRUD de usuários
│   └── layout.tsx            # Layout raiz
│
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/               # Componentes UI base
│   │   └── auth-guard.tsx    # Guard de autenticação
│   ├── contexts/             # Context API
│   │   └── auth.context.tsx  # Contexto de autenticação
│   ├── hooks/                # Custom hooks
│   │   └── use-users.ts      # Hooks para usuários
│   ├── lib/                  # Utilitários
│   │   ├── http.ts           # Cliente Axios
│   │   └── cn.ts             # Class names
│   ├── providers/            # Providers
│   │   └── react-query-provider.tsx
│   ├── services/             # Camada de API
│   │   ├── auth.service.ts   # Serviço de autenticação
│   │   └── users.service.ts  # Serviço de usuários
│   └── types/                # TypeScript types
│       ├── auth.ts
│       └── user.ts
│
└── middleware.ts             # Middleware Next.js (proteção de rotas)
```

## Funcionalidades

### Autenticação
- ✅ Login
- ✅ Registro
- ✅ Logout
- ✅ Proteção de rotas (middleware)
- ✅ Auth Guard (client-side)

### Usuários (CRUD)
- ✅ Listar usuários
- ✅ Criar usuário
- ✅ Editar usuário
- ✅ Deletar usuário
- ✅ Ativar/Desativar usuário

## Páginas

### Públicas
- `/login` - Página de login
- `/register` - Página de registro

### Autenticadas
- `/home` - Página inicial (dashboard)
- `/users` - Lista de usuários
- `/users/new` - Criar novo usuário
- `/users/[id]/edit` - Editar usuário

## Integração com Backend

O frontend se comunica com o backend através da API REST:

- **Base URL:** `http://localhost:3000` (configurável via `.env.local`)
- **Autenticação:** JWT via header `Authorization: Bearer {token}`
- **Storage:** localStorage para tokens

## React Query

O projeto utiliza TanStack Query para gerenciamento de estado do servidor:

- Cache automático de requisições
- Revalidação em segundo plano
- Mutations com invalidação de cache
- Loading e error states

## Scripts

```bash
dev      # Desenvolvimento (porta 3001)
build    # Build de produção
start    # Servidor de produção
lint     # ESLint
```

## Arquitetura

### Visão Geral

O projeto segue uma arquitetura em camadas inspirada em Clean Architecture, separando responsabilidades e facilitando manutenção e testes.

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│                    (Pages & Components)                  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Application Layer                      │
│            (Hooks, Contexts, Providers)                  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                    Domain Layer                          │
│              (Services, Types, Utils)                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                Infrastructure Layer                      │
│              (HTTP Client, External APIs)                │
└─────────────────────────────────────────────────────────┘
```

### Camadas

#### 1. **Presentation Layer (app/)**

Responsável pela interface do usuário e roteamento.

- **Route Groups:** Organização semântica de rotas
  - `(public)` - Rotas acessíveis sem autenticação
  - `(auth)` - Rotas que requerem autenticação
- **Server Components:** Páginas renderizadas no servidor (quando possível)
- **Client Components:** Componentes interativos com estado

```
app/
├── (public)/login      → Formulário de login
├── (public)/register   → Formulário de registro
└── (auth)/users        → CRUD de usuários (protegido)
```

#### 2. **Application Layer (src/hooks, src/contexts, src/providers)**

Gerencia estado da aplicação e lógica de negócio do cliente.

**Contexts:**
- `AuthContext`: Estado global de autenticação
  - Usuário logado
  - Funções de login/logout/register
  - Status de loading

**Hooks (React Query):**
- `useUsers()`: Busca lista de usuários
- `useUser(id)`: Busca usuário específico
- `useCreateUser()`: Mutation para criar
- `useUpdateUser()`: Mutation para atualizar
- `useDeleteUser()`: Mutation para deletar

**Providers:**
- `ReactQueryProvider`: Configuração do TanStack Query
- `AuthProvider`: Provê contexto de autenticação

#### 3. **Domain Layer (src/services, src/types)**

Contém a lógica de negócio e regras da aplicação.

**Services:**
```typescript
AuthService
├── login(credentials)
├── register(data)
├── setAuthToken(token)
└── removeAuthToken()

UsersService
├── getUsers()
├── getUserById(id)
├── createUser(data)
├── updateUser(id, data)
└── deleteUser(id)
```

**Types:**
- Interfaces e tipos TypeScript
- Contratos de dados (DTOs)
- Tipagem forte em toda aplicação

#### 4. **Infrastructure Layer (src/lib/http.ts)**

Comunicação com APIs externas e serviços de terceiros.

**HTTP Client (Axios):**
```typescript
api.interceptors.request  → Adiciona token JWT
api.interceptors.response → Trata erros 401
```

### Fluxo de Dados

#### Request Flow (Buscar Dados)

```
1. Component          → useUsers()
2. React Query        → Verifica cache
3. Hook               → Chama UsersService.getUsers()
4. Service            → Faz requisição via api (Axios)
5. Interceptor        → Adiciona header Authorization
6. Backend API        → Processa e retorna dados
7. React Query        → Atualiza cache
8. Component          → Re-renderiza com dados
```

#### Mutation Flow (Alterar Dados)

```
1. Component          → useCreateUser()
2. User Action        → Clica em "Criar"
3. Mutation           → Chama UsersService.createUser()
4. Service            → POST /users
5. Success            → Invalida cache ['users']
6. React Query        → Refetch automático
7. Component          → Atualiza lista
8. Toast              → Mostra notificação de sucesso
```

### Padrões Arquiteturais

#### 1. **Repository Pattern (Services)**

Services atuam como repositories abstraindo a comunicação com a API.

```typescript
class UsersService {
  static async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  }
}
```

#### 2. **Composition Pattern (Hooks)**

Hooks compõem funcionalidades reutilizáveis.

```typescript
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
  });
}
```

#### 3. **Provider Pattern (Context)**

Context API + Provider para estado global.

```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

#### 4. **Guard Pattern (Proteção)**

Proteção em múltiplas camadas:

**Middleware (SSR):**
```typescript
export function middleware(request: NextRequest) {
  if (isAuthRoute && !hasToken) {
    return NextResponse.redirect('/login');
  }
}
```

**AuthGuard (CSR):**
```typescript
export function AuthGuard({ children }) {
  if (!user && !isLoading) {
    router.push('/login');
  }
  return <>{children}</>;
}
```

### Estado e Cache

#### React Query (Server State)

```typescript
QueryClient {
  defaultOptions: {
    queries: {
      staleTime: 60_000,        // Cache válido por 1 min
      refetchOnWindowFocus: false
    }
  }
}
```

**Cache Keys:**
```typescript
['users']           → Lista de todos os usuários
['users', id]       → Usuário específico por ID
```

**Cache Invalidation:**
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['users'] });
}
```

#### Context API (Client State)

```typescript
AuthContext {
  user: User | null,
  isLoading: boolean,
  login: (credentials) => Promise<void>,
  logout: () => void
}
```

### Tratamento de Erros

#### Camadas de Tratamento

1. **Interceptor Axios:** Trata erros HTTP globalmente
2. **React Query:** onError em mutations
3. **Try/Catch:** Em ações específicas
4. **Toast:** Feedback visual ao usuário

```typescript
try {
  await login(credentials);
  toast.success('Login realizado!');
} catch (error) {
  toast.error(error.response?.data?.message || 'Erro ao fazer login');
}
```

### Autenticação e Autorização

#### Fluxo Completo

```
┌─────────────┐
│   LOGIN     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│ AuthService.login()             │
│ └─> POST /auth/login            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Salva token no localStorage     │
│ Define header Authorization      │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Middleware valida em SSR         │
│ AuthGuard valida em CSR          │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Interceptor adiciona token       │
│ em todas as requisições          │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Backend valida JWT               │
│ Retorna dados protegidos         │
└─────────────────────────────────┘
```

#### Storage Strategy

- **localStorage:** Token persistente (sobrevive refresh)
- **Context:** Estado em memória (performance)
- **Interceptor:** Adiciona automaticamente em requests

### Performance

#### Otimizações Implementadas

1. **React Query Cache:** Reduz requisições desnecessárias
2. **Server Components:** Renderização no servidor quando possível
3. **Code Splitting:** Lazy loading de rotas (Next.js automático)
4. **Debounce:** Em buscas e filtros (quando aplicável)
5. **Optimistic Updates:** Atualizações instantâneas (UI)

#### Bundle Optimization

```typescript
experimental: {
  optimizePackageImports: ['@tanstack/react-query']
}
```

### Segurança

#### Medidas Implementadas

1. **JWT no localStorage:** Token criptografado
2. **HTTP Only (futuro):** Migrar para cookies httpOnly
3. **CORS:** Validação de origem no backend
4. **Validação Client + Server:** Dupla camada
5. **Timeout:** 30s para prevenir requests pendurados
6. **Sanitização:** Class-validator no backend

### Escalabilidade

#### Preparado para Crescimento

```
src/
├── modules/              (futuro)
│   ├── users/
│   ├── products/
│   └── orders/
│
├── shared/               (futuro)
│   ├── components/
│   ├── hooks/
│   └── utils/
```

**Princípios:**
- Separação clara de responsabilidades
- Baixo acoplamento entre camadas
- Alta coesão dentro de módulos
- Fácil adição de novos recursos

## Diagrama de Componentes

```
                    ┌──────────────────┐
                    │   Next.js App    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼────────┐    │    ┌────────▼─────────┐
    │  Route Groups    │    │    │   Middleware     │
    │  (public/auth)   │    │    │  (SSR Guards)    │
    └─────────┬────────┘    │    └────────┬─────────┘
              │             │              │
    ┌─────────▼─────────────▼──────────────▼─────────┐
    │              Providers Layer                    │
    │  ┌──────────────┐  ┌────────────────────────┐ │
    │  │ React Query  │  │    Auth Provider       │ │
    │  └──────────────┘  └────────────────────────┘ │
    └────────────────────────┬───────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼────────┐    │    ┌────────▼─────────┐
    │     Hooks        │    │    │    Components    │
    │  (React Query)   │    │    │   (UI + Logic)   │
    └─────────┬────────┘    │    └────────┬─────────┘
              │             │              │
              │    ┌────────▼────────┐     │
              │    │    Contexts     │     │
              │    │  (Global State) │     │
              │    └────────┬────────┘     │
              │             │              │
    ┌─────────▼─────────────▼──────────────▼─────────┐
    │              Services Layer                     │
    │  ┌──────────────┐  ┌────────────────────────┐ │
    │  │ AuthService  │  │    UsersService        │ │
    │  └──────────────┘  └────────────────────────┘ │
    └────────────────────────┬───────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  HTTP Client    │
                    │    (Axios)      │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Backend API    │
                    │  (NestJS)       │
                    └─────────────────┘
```


