#!/bin/sh

echo "$VAULT_PASS" > ~/.vault_pass.txt
mkdir ~/.ssh
ansible-vault --vault-password-file ~/.vault_pass.txt view ansible/ssh_key.txt.secret > ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa

# ansible-playbook -e "build_sha=$GITHUB_SHA" --vault-password-file ~/.vault_pass.txt -i ansible/hosts ansible/deploy.yml

echo "[command]ls -alh"
ls -alh

echo "[command]pwd"
pwd

echo "[command]printenv"
printenv > foo.txt
cat foo.txt

echo "[command]ls -alh /source"
ls -alh /source
