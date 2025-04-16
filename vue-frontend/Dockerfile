FROM node:23.11.0-slim AS build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node / ./
USER node
RUN npm install
RUN npm run build

FROM nginx:1.27.4
WORKDIR /usr/share/nginx/html
COPY --from=build /home/node/app/dist ./
EXPOSE 7070
