import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'

const prepareSpace = async (options) => {
    console.log('Preparing Space...')
    console.log('Command options: ', options)

    const sshCommand = await getSSHCommandString()

    try {
        console.log('Executing commands 2222...')

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
