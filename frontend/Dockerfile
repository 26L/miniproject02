# Frontend Dockerfile
# Stage 1: Build
FROM node:18-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# .env.production 대신 환경변수 주입을 위해 빌드 시점에 설정하거나, 런타임에 주입하는 방식 고려
# 여기서는 기본 빌드 수행
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Nginx 설정 복사 (SPA 라우팅 지원용)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
