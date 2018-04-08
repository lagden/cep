FROM node:8.9.1-alpine
LABEL maintainer="docker@lagden.in"

ARG npm_cmd="npm i --progress=false --quiet"
# ARG port=3000

# ENV NODE_ENV="production"
# ENV PORT=$port
ENV HOME=/home/node
ENV APP=$HOME/app
ENV DOCKER_MODE=1

RUN mkdir $APP
COPY . $APP
RUN chown -R node:node $HOME

USER node
WORKDIR $APP
RUN $npm_cmd

# EXPOSE $port
