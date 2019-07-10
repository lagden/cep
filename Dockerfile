FROM node:12.4-alpine
LABEL maintainer="docker@lagden.in"

RUN apk --update add --no-cache acl

ARG NODE_ENV=production
ARG PORT=3000
ARG BASE=/home/node

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV BASE=$BASE
ENV APP=$BASE/app

EXPOSE $PORT

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN setfacl -R -m d:u:node:rwx,u:node:rwX $BASE

USER node
RUN npm ci --ignore-scripts
