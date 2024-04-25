#!/bin/sh

mkdir ~/.ssh

# If $INPUT_KEY is set, write it to a file
if [ -n "$INPUT_KEY" ]; then
  echo "$INPUT_KEY" > ~/.ssh/id_rsa
  chmod 0600 ~/.ssh/id_rsa
fi

ls -alh ~/.ssh
cat ~/.ssh/id_rsa

touch ~/.ssh/known_hosts ; chmod 600 ~/.ssh/known_hosts
ssh-keyscan -p $INPUT_PORT $INPUT_HOST >> ~/.ssh/known_hosts

SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

ssh $SSH_OPTIONS -i ~/.ssh/id_rsa -p $INPUT_PORT $INPUT_USERNAME@$INPUT_HOST "ls -alh"

cd /src ; npm run start -- $@


