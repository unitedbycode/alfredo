FROM ubuntu:22.04

ARG NODE_VERSION=20

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

## Ansible
RUN apt-get update && apt-get install -y \
    ansible \
    openssh-client \
    sshpass \
    git \
    python3-passlib \
    && rm -rf /var/lib/apt/lists/*

# DOCKER-OUTSIDE-OF-DOCKER
RUN apt-get update
RUN apt-get install -y gnupg lsb-release sudo curl
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --batch --yes --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update
RUN apt-get -y install docker-ce-cli docker-compose-plugin

## NodeJS
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm


COPY . /src
RUN cd /src && npm ci
