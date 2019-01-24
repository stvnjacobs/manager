FROM node:lts-alpine

WORKDIR /src

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ENTRYPOINT ["yarn"]
