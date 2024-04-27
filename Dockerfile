FROM ghcr.io/unitedbycode/alfredo:sha-ef90152

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN cd /src ; rm -rf {cli, ansible}
COPY cli /src/cli
COPY ansible /src/ansible

ENTRYPOINT ["/entrypoint.sh"]
