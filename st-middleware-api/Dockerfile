FROM node:23.11.0-alpine3.21

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package* ./

RUN npm install
RUN npm install typescript -g

COPY src/* .

RUN tsc --init && tsc

EXPOSE 3002

CMD ["node", "st-middleware-server.js"]

