FROM node:20 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# ----------------------------

FROM node:20 AS release

WORKDIR /app

COPY --from=build /app/server/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/server.js" ]