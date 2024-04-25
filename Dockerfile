FROM ghcr.io/unitedbycode/alfredo:sha-0bb88e3

RUN cd /src ; rm -rf cli

COPY cli /src/cli
