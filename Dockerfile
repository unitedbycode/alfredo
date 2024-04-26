FROM ghcr.io/unitedbycode/alfredo:sha-02b71ed

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN cd /src ; rm -rf {cli, ansible}
COPY cli /src/cli
COPY ansible /src/ansible

ENTRYPOINT ["/entrypoint.sh"]
