FROM ghcr.io/unitedbycode/alfredo:sha-0bb88e3

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN cd /src ; rm -rf cli
COPY cli /src/cli
