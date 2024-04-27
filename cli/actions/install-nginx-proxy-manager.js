import core from '@actions/core'
import exec from '@actions/exec'
import { startCommandGreetings, validateInputs } from '../utils/common.js'
import { prepareUserKey, privateKeyPath } from '../utils/system-ssh-connection.js'

const task = async () => {
    await startCommandGreetings('Installing nginx-proxy-manager...')

    // System minimum requirements
    validateInputs(['host', 'port', 'username', 'key'])

    try {
        // Playbook requirements
        validateInputs([])

        prepareUserKey()

        const user = core.getInput('username')

        // The trailing comma is necessary for the playbook to work, it must be a list.
        const inventory = `${core.getInput('host')},`

        await exec.exec(
            'ansible-playbook',
            [
                `-i ${inventory}`,
                `--user=${user}`,
                `--private-key=${privateKeyPath}`,
                '/src/ansible/playbooks/nginx-proxy-manager/nginx-proxy-manager.yml',
                '-e',
                `username=${core.getInput('username')}`,
                '-e',
                `target_hosts=all`,
            ],
            { cwd: '/src/ansible' },
        )
    } catch (error) {
        process.env.CI ? core.setFailed(error.message) : console.log(error)
    }
}

export default task
