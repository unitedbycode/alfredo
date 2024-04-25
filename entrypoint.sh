#!/bin/sh

mkdir ~/.ssh ; chmod 700 ~/.ssh
#touch ~/.ssh/known_hosts ; chmod 600 ~/.ssh/known_hosts
echo "[command]cat $INPUT_HOST $INPUT_PORT"
echo "first 3 chars of $INPUT_HOST"
echo $INPUT_HOST | cut -c 1-3
echo "first 1 chars of $INPUT_PORT"
echo $INPUT_PORT | cut -c 1
echo "second char of $INPUT_PORT"
echo $INPUT_PORT | cut -c 2


ssh-keyscan -p $INPUT_PORT -H $INPUT_HOST >> ~/.ssh/known_hosts

echo "[command]cat known_hosts"
cat ~/.ssh/known_hosts

# If $INPUT_KEY is set, write it to a file
if [ -n "$INPUT_KEY" ]; then
  echo "$INPUT_KEY" > ~/.ssh/id_rsa
  chmod 0600 ~/.ssh/id_rsa
fi

echo "[command]ls ~/.ssh and cat key"
ls -alh ~/.ssh
cat ~/.ssh/id_rsa

SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

echo "[command]With options...."
ssh $SSH_OPTIONS -i ~/.ssh/id_rsa -p $INPUT_PORT $INPUT_USERNAME@$INPUT_HOST "ls -alh"

echo "[command]WITHOUT options...."
ssh -i ~/.ssh/id_rsa -p $INPUT_PORT $INPUT_USERNAME@$INPUT_HOST "ls -alh"

cd /src ; npm run start -- $@


