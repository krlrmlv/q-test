FROM node:18 AS build

WORKDIR /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

# Установка node-prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune

FROM node:18

WORKDIR /app

COPY --from=build /app .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]