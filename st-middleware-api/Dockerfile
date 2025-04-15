FROM node:23.11.0-alpine3.21

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package* ./

USER node 

RUN npm install

COPY --chown=node:node dist/ .

EXPOSE 3002

CMD ["node", "st-middleware-server.js"]
