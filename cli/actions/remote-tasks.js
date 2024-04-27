import core from '@actions/core'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'
import { startCommandGreetings } from '../utils/common.js'
import exec from '@actions/exec'

const remoteTasks = async () => {
    await startCommandGreetings('Starting remote tasks...')

    const cmd = `
    pwd
    ls -alh
    echo "-----------------"
    echo $HOME
    ls -alh $HOME
    whoami
    `

    try {
        // Running a command
        const sshCommand = getSSHCommandString()
        await exec.exec(`${sshCommand} ${cmd}`)

        console.log('----######-----#####-----')
        console.log('----######-----#####-----')
        console.log('----######-----#####-----')
        console.log('----######-----#####-----')

        // Using NodeSSH
        const ssh = new NodeSSH()

        await ssh.connect({
            host: core.getInput('host'),
            username: core.getInput('username'),
            privateKey: core.getInput('key'),
        })

        await ssh.execCommand(cmd, {
            onStdout(chunk) {
                console.log('STDOUT:\n', chunk.toString('utf8'))
            },
            onStderr(chunk) {
                console.log('STDERR:\n', chunk.toString('utf8'))
            },
        })

        process.exit(0)

        // Record time when greeting was done as part of outputs
        const time = new Date().toTimeString()
        core.setOutput('time', time)
    } catch (error) {
        process.env.CI ? core.setFailed(error.message) : console.log(error)
    }
}

export default remoteTasks
