#!/bin/sh

mkdir ~/.ssh ; chmod 700 ~/.ssh

# If $INPUT_KEY is set, write it to a file
if [ -n "$INPUT_KEY" ]; then
  echo "$INPUT_KEY" > ~/.ssh/id_rsa
  chmod 600 ~/.ssh/id_rsa
fi

touch ~/.ssh/known_hosts ; chmod 600 ~/.ssh/known_hosts

echo "[command]key-scan...."
#ssh-keyscan -p $INPUT_PORT -H $INPUT_HOST >> ~/.ssh/known_hosts
ssh-keyscan $INPUT_HOST >> ~/.ssh/known_hosts

echo "[command]cat known_hosts"
cat ~/.ssh/known_hosts

echo "[command]ls ~/.ssh and cat key"
ls -alh ~/.ssh

SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

echo "[command]With options...."
ssh $SSH_OPTIONS -i ~/.ssh/id_rsa -p $INPUT_PORT $INPUT_USERNAME@$INPUT_HOST "ls -alh spaces"

echo "[command]WITHOUT options...."
ssh -i ~/.ssh/id_rsa -p $INPUT_PORT $INPUT_USERNAME@$INPUT_HOST "ls -alh spaces"

cd /src ; npm run start -- $@


