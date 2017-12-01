FROM node:8.9.1-alpine
LABEL maintainer="docker@lagden.in"

ARG npm_cmd="npm i --progress=false --quiet --production"

ENV PORT=$port
ENV HOME=/home/node
ENV LIB=$HOME/lib

RUN mkdir $LIB
COPY . $LIB
RUN chown -R node:node $HOME

USER node
WORKDIR $LIB
RUN $npm_cmd
