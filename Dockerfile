FROM serversideup/php:beta-8.3-cli-bookworm

#RUN apt-get update && apt-get install -y \
#    ansible \
#    openssh-client \
#    sshpass \
#    git \
#    && rm -rf /var/lib/apt/lists/*

USER root

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

COPY . /source

ENTRYPOINT ["/entrypoint.sh"]
