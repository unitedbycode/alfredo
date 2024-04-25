FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ansible \
    openssh-client \
    sshpass \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY . /src
RUN cd /src && npm ci
