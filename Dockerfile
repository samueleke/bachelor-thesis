FROM node:lts-alpine

RUN npm i -g nodemon
RUN npm install -g tsconfig-paths

USER node

RUN mkdir /home/node/allamvizsga

WORKDIR /home/node/allamvizsga

COPY --chown=node/node ./tsconfig.base.json ./

COPY --chown=node:node ./package*.json ./

COPY --chown=node:node ./nx.json ./

# COPY --chown=node:node ./apps ./apps

# COPY --chown=node:node ./packages ./packages

RUN rm -rf node_modules && npm i

COPY --chown=node:node . .