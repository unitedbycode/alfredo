#!/usr/bin/env bash

set -e

# If .env file does not exits, exit
if [ ! -f .env ]; then
    echo "Please create a .env file, or be sure to run in in the project root: cli/local_run.sh"
    exit 1
fi

echo "starting..."

# Load .env file, exporting all variables so it can be used passing env to the container
set -o allexport
source .env
set +o allexport;

# If INPUT_KEY_BASE64 is set, decode it and export it as INPUT_KEY
if [ -n "$INPUT_KEY_BASE64" ]; then
    export INPUT_KEY=$(echo "$INPUT_KEY_BASE64" | base64 -d)
fi

## Locally get a repository like if it was the the checkout of a repository
cd $DEPLOY_DIR
git archive -o bench_app_archive.tar.gz --format=tar.gz main
cd -
mv $DEPLOY_DIR/bench_app_archive.tar.gz .
rm -rf bench_app
mkdir -p bench_app
tar xvf bench_app_archive.tar.gz -C ./bench_app



echo "Running task: $1"

docker run --rm \
    -it \
    -v $(pwd):/src \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(pwd)/bench_app:/github/workspace \
    -v ./entrypoint.sh:/entrypoint.sh \
    --entrypoint="/entrypoint.sh" \
    -w /src \
    -e "HOME" \
    -e "INPUT_SPACE" \
    -e "INPUT_IMAGE" \
    -e "INPUT_HOST" \
    -e "INPUT_PORT" \
    -e "INPUT_USERNAME" \
    -e "INPUT_PASSWORD" \
    -e "INPUT_KEY" \
    -e "INPUT_KEY_BASE64" \
    -e "INPUT_PUBLIC_KEY" \
    -e "INPUT_PUBLIC_KEY_BASE64" \
    alfredo-local \
    "$1"
