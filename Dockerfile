# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências de produção
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Copia o código fonte
COPY . .

# Define variável de ambiente para build (pode ser sobrescrita)
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build da aplicação
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia apenas os arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ajusta permissões
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

