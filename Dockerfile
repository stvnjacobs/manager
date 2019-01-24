FROM node:lts-alpine

WORKDIR /src

COPY . .

CMD ["yarn"]
