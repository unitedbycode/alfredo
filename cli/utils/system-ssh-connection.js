import core from '@actions/core'
import os from 'os'
import fs from 'fs'

const host = core.getInput('host')
const port = core.getInput('port')
const username = core.getInput('username')
const home = os.homedir()

let userKeyIsPrepared = false

const privateKeyPath = `${home}/.ssh/private_key`
const publicKeyPath = `${home}/.ssh/public_key`

const preparePrivateKey = () => {
    let key = core.getInput('key')

    // If it doesn't finish with a new line, append it
    if (!key.endsWith('\n')) {
        key += '\n'
    }

    fs.writeFileSync(`${privateKeyPath}`, key, {
        encoding: 'utf-8',
        mode: 0o600,
    })
}

const preparePublicKey = () => {
    let public_key = core.getInput('public_key')

    // If it doesn't finish with a new line, append it
    if (!public_key.endsWith('\n')) {
        public_key += '\n'
    }

    fs.writeFileSync(`${home}/.ssh/public_key`, public_key, {
        encoding: 'utf-8',
        mode: 0o644,
    })
}

const prepareUserKey = () => {
    if (userKeyIsPrepared) {
        return
    }

    // Create .ssh directory and write the key to id_rsa file
    fs.mkdirSync(`${home}/.ssh`, { recursive: true, mode: 0o700 })

    preparePrivateKey()

    preparePublicKey()

    userKeyIsPrepared = true
}

const getSSHCommandString = () => {
    if (!userKeyIsPrepared) {
        prepareUserKey()
    }

    // SSH options for no needing keyscan
    const sshOptions = `-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`

    return `ssh ${sshOptions} -i ${privateKeyPath} -p ${port} ${username}@${host}`
}

export { prepareUserKey, getSSHCommandString, privateKeyPath, publicKeyPath }
