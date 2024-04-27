FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ansible \
    openssh-client \
    sshpass \
    git \
    python3-passlib \
    && rm -rf /var/lib/apt/lists/*

COPY . /src
RUN cd /src && npm ci
