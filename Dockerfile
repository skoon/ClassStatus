# frontend/Dockerfile
FROM node:alpine AS prod

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

COPY dist /app

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/dist /usr/share/nginx/html

COPY nginx_template /etc/nginx/conf.d/

EXPOSE 8080

