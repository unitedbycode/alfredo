FROM ghcr.io/unitedbycode/alfredo:sha-2a672b7

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN cd /src ; rm -rf cli
COPY cli /src/cli

ENTRYPOINT ["/entrypoint.sh"]
