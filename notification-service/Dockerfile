FROM node:22 AS build

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm exec prisma generate

RUN pnpm build

FROM node:22 AS production

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package.json .

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/ ./prisma/
COPY --from=build /app/src/infrastructure/templates/ ./dist/infrastructure/templates/

RUN npm install -g pnpm

RUN pnpm install --prod --frozen-lockfile
RUN pnpm exec prisma generate


EXPOSE 3002
