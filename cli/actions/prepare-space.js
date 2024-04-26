import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'

const prepareSpace = async (options) => {
    console.log('Preparing Space...')
    console.log('Command options: ', options)

    const sshCommand = await getSSHCommandString()

    try {
        const ssh = new NodeSSH()
        console.log('Connecting to server...')

        ssh.connect({
            host: process.env.INPUT_HOST,
            username: process.env.INPUT_USERNAME,
            privateKey: process.env.INPUT_KEY,
        }).then(() => {
            console.log('foooo 22222222')

            ssh.execCommand('ls -alh', {}).then((result) => {
                console.log('STDOUT:', result.stdout)
                console.log('STDERR:', result.stderr)
                process.exit(0)
            })
        })

        return
        const folder = 'spaces'

        const cmd = `${sshCommand} bash -c '''
        ls -alh
        ls -alh ${folder}
        pwd
        whoami
        '''`

        console.log(cmd)

        await execute(cmd)

        // Record time when greeting was done as part of outputs
        const time = new Date().toTimeString()
        core.setOutput('time', time)
    } catch (error) {
        core.setFailed(error.message)
    }
}

export default prepareSpace
