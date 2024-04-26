import core from '@actions/core'
import os from 'os'
import fs from 'fs'

const host = core.getInput('host')
const port = core.getInput('port')
const username = core.getInput('username')
const home = os.homedir()

let userKeyIsPrepared = false

const prepareUserKey = async () => {
    let key = core.getInput('key')

    // If it doesn't finish with a new line, append it
    if (!key.endsWith('\n')) {
        key += '\n'
    }

    // Create .ssh directory and write the key to id_rsa file
    fs.mkdirSync(`${home}/.ssh`, { recursive: true, mode: 0o700 })

    fs.writeFileSync(`${home}/.ssh/id_rsa`, key, {
        encoding: 'utf-8',
        mode: 0o600,
    })

    userKeyIsPrepared = true
}

const getSSHCommandString = async () => {
    if (!userKeyIsPrepared) {
        await prepareUserKey()
    }

    // SSH options for no needing keyscan
    const sshOptions = `-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`

    return `ssh ${sshOptions} -i ${home}/.ssh/id_rsa -p ${port} ${username}@${host}`
}

export { prepareUserKey, getSSHCommandString }
