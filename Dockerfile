FROM node:12.18.4-buster-slim as build
WORKDIR /home
COPY package.json .
COPY yarn.lock .
# install production deps
RUN yarn
COPY . .
# building the javascript
RUN yarn build

FROM node:12.18.4-buster-slim as test
WORKDIR /home

RUN yarn test


FROM node:12.18.4-buster-slim
WORKDIR /home
COPY --from-stage=build node_modules/ node_modules/
COPY --from-stage=build .env .
COPY --from-stage=build build/ build/