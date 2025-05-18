# Установка зависимостей
FROM node:24 AS builder

ARG USER_ID
ARG GROUP_ID

WORKDIR /app

RUN mkdir -p node_modules && \
  chown -R "$USER_ID:$GROUP_ID" node_modules

COPY package*.json ./
RUN npm install && \
  chown -R "$USER_ID:$GROUP_ID" node_modules

# Финальный образ
FROM node:24-alpine

ARG USER_ID
ARG GROUP_ID

WORKDIR /app 

COPY --from=builder --chown=$USER_ID:$GROUP_ID /app/node_modules ./node_modules
COPY --chown=$USER_ID:$GROUP_ID . .

RUN if [ -n "$USER_ID" ] && [ -n "$GROUP_ID" ]; then \
  deluser node 2>/dev/null && \
  addgroup -g $GROUP_ID node && \
  adduser -u $USER_ID -G node -D node; \
  fi

USER node

EXPOSE 5000
CMD ["npm", "run", "dev"]