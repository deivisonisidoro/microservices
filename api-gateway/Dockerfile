FROM node:22-alpine AS build

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm exec prisma generate

RUN pnpm build

FROM node:22-alpine AS production

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package.json .

COPY --from=build /app/dist ./dist
COPY --from=build /app/src/infra/databases/prisma/schema.prisma ./src/infra/databases/prisma/schema.prisma

RUN npm install -g pnpm

RUN pnpm install --prod --frozen-lockfile
RUN pnpm exec prisma generate


EXPOSE 3000

CMD ["node", "dist/presentation/server.js"]