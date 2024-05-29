FROM node:18.15.0

WORKDIR /orchestrator

ENV PORT=4000

ENV PASSWORD="MsKKErccIxO5oEZX6hZQWvNqJxQ8bLFh"

COPY package.json package-lock.json /orchestrator/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]