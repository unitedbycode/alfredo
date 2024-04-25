FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ansible \
    openssh-client \
    sshpass \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

COPY . /src

RUN cd /src && npm ci

ENTRYPOINT ["/entrypoint.sh"]
