# Etapa 1: Construir a aplicação
FROM node:18 AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração do pnpm e do projeto
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm
RUN npm install -g pnpm

# Instalar as dependências
RUN pnpm install

# Copiar o código-fonte
COPY ./src ./src

# Compilar o TypeScript
RUN pnpm run build

# Aplicar migrações do Prisma (opcional, se você usar migrações)
RUN pnpm exec prisma generate
RUN pnpm exec prisma migrate deploy --schema=src/infra/databases/prisma/schema.prisma

# Etapa 2: Criar a imagem final
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Copiar o arquivo de configuração de dependências
COPY package.json ./

# Instalar as dependências de produção
RUN pnpm install --prod

RUN pnpm prisma generate 


# Expor a porta que a API irá rodar
EXPOSE 3000


CMD ["node", "dist/presentation/server.js"]
