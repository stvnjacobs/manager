FROM node:lts-alpine

WORKDIR /src

COPY . .

ENTRYPOINT ["yarn"]
