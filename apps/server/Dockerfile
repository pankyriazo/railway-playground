FROM node:20 AS build

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# ----------------------------

FROM node:20 AS release

WORKDIR /app

COPY --from=build /app/dist .

CMD [ "node", "server.js" ]