FROM node:20-bookworm

#ENV ANSIBLE_HOST_KEY_CHECKING=False

# Seems that GH Actions already has Ansible installed!
#
#RUN apt-get update && apt-get install -y \
#    ansible \
#    openssh-client \
#    sshpass \
#    git \
#    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

COPY . /cli
RUN cd /cli && npm ci

ENTRYPOINT ["/entrypoint.sh"]
