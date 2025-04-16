
FROM node:lts-alpine as build-frontend
WORKDIR /app
COPY ./package*.json ./
RUN npm install

COPY ./ .
RUN npm run build


EXPOSE 8090
# start PocketBase and node app
CMD ["npm", "start"]