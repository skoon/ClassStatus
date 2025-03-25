FROM alpine:latest AS build-backend
ARG PB_VERSION=0.25.9
RUN mkdir /app
RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /app/pb/

# uncomment to copy the local pb_migrations dir into the image
#COPY ./db/pb_migrations/StudentLogEntries_initialize /app/pb/pb_migrations/1731966407_created_StudenLogEntries

FROM node:lts-alpine as build-frontend
WORKDIR /app
COPY ./package*.json ./
RUN npm install

COPY ./ .
RUN npm run build


FROM alpine:latest AS production
COPY --from=build-backend /app .
COPY --from=build-frontend /app/dist /app/pb/pb_public
EXPOSE 8090
# start PocketBase
CMD ["sh" "-c" "/pb/pocketbase serve --http=0.0.0.0:8090;npm start"]
