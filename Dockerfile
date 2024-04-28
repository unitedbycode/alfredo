# base-node20.Dockerfile
#FROM ghcr.io/unitedbycode/alfredo:sha-ef90152

# base-ubuntu.Dockerfile - Experiment w/ dind
FROM ghcr.io/unitedbycode/alfredo:sha-1b792ee

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN cd /src ; rm -rf {cli, ansible}
COPY cli /src/cli
COPY ansible /src/ansible

ENTRYPOINT ["/entrypoint.sh"]
