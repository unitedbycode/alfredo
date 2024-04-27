import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'
import figlet from 'figlet'
import { $, spinner, sleep } from 'zx'
import os from 'os'

const prepareSpace = async (options) => {
    await figlet('Alfredo', (err, data) => {
        if (err) {
            core.setFailed(err)
        }
        console.log(data)
    })
    console.log('Command options: ', options)
    console.log('Preparing Space...')

    const sshCommand = getSSHCommandString()

    const folder = 'spaces'

    try {
        const ssh = new NodeSSH()

        await spinner('Connecting to server...', async () => {
            await sleep(200)
        })

        await ssh.connect({
            host: process.env.INPUT_HOST,
            username: process.env.INPUT_USERNAME,
            privateKey: process.env.INPUT_KEY,
        })

        const cmd = `
        ls -alh
        sleep 2
        ls -alh ${folder}
        sleep 3
        pwd
        whoami
        `

        await ssh.execCommand(cmd, {
            onStdout(chunk) {
                console.log('STDOUT:\n', chunk.toString('utf8'))
            },
            onStderr(chunk) {
                console.log('STDERR:\n', chunk.toString('utf8'))
            },
        })

        await execute(`${sshCommand} ${cmd}`)

        process.exit(0)
        // Record time when greeting was done as part of outputs
        const time = new Date().toTimeString()
        core.setOutput('time', time)
    } catch (error) {
        core.setFailed(error.message)
    }
}

export default prepareSpace
