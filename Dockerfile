# Development
# ----------
FROM node:16.10-alpine3.14 as dev
LABEL maintainer="lagden@gmail.com"

# If Docker Host is Mac or Windows
ENV ENTR_INOTIFY_WORKAROUND=1
COPY --from=lagden/entr:5.0-alpine3.14 /usr/local/bin/entr /usr/local/bin/.

# Shared libraries
RUN apk add --no-cache --update libc6-compat
RUN ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2

# Timezone
RUN apk add --no-cache --update tzdata
ENV TZ=America/Sao_Paulo
RUN ln -s /usr/share/zoneinfo/$TZ /etc/localtime

# Clear apk cache
RUN rm -rf /var/cache/apk/*

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
ADD --chown=node:node . $BASE_APP

WORKDIR $BASE_APP
RUN npm ci

USER node


# Main
# ----------
FROM node:16.9-alpine3.14 as main
LABEL maintainer="lagden@gmail.com"

# Shared libraries
RUN apk add --no-cache --update libc6-compat
RUN ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2

# Timezone
RUN apk add --no-cache --update tzdata
ENV TZ=America/Sao_Paulo
RUN ln -s /usr/share/zoneinfo/$TZ /etc/localtime

# Clear apk cache
RUN rm -rf /var/cache/apk/*

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
ADD --chown=node:node . $BASE_APP

WORKDIR $BASE_APP
RUN bin/node/prod.js
RUN npm ci
RUN rm -rf bin/docker bin/front bin/local bin/node bin/front
RUN rm -rf .eslintrc* .prettierrc* .gitignore .yarnrc.yml .yarn yarn.lock

USER node
