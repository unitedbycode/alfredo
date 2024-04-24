FROM serversideup/php:beta-8.3-cli-bookworm

# GH Actions Runner user
ARG UID=1001
ARG GID=127

#RUN apt-get update && apt-get install -y \
#    ansible \
#    openssh-client \
#    sshpass \
#    git \
#    && rm -rf /var/lib/apt/lists/*

USER ${UID}:${GID}

COPY --chown=${UID}:${GID} entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --chown=${UID}:${GID} . /cli

RUN cd /cli ; composer install

ENTRYPOINT ["/entrypoint.sh"]
