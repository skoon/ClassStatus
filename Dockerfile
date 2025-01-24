FROM alpine:latest

ARG PB_VERSION=0.23.1

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
COPY ./pb_migrations/StudentLogEntries_initialize /pb/pb_migrations/1731966407_created_StudenLogEntries


FROM node:lts-alpine as build-frontend
WORKDIR /dist
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM golang:1.18 AS build-backend

RUN mkdir /app
ADD ./backend /app
COPY --from=build-frontend /app/dist /app/pb_public
WORKDIR /app

RUN CGO_ENABLED=0 GOOS=linux go build -o <binary-name> .

FROM alpine:latest AS production
COPY --from=build-backend /app .

EXPOSE 8090
# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=127.0.0.1:8090"]
