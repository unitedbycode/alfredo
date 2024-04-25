FROM ghcr.io/unitedbycode/alfredo:sha-c780c4b

RUN cd /cli ; rm -rf src

COPY src /cli/src

ENTRYPOINT ["/entrypoint.sh"]
