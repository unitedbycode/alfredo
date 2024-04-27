import core from '@actions/core'
import exec from '@actions/exec'
import { startCommandGreetings, echo } from '../utils/common.js'
import { prepareUserKey, publicKeyPath, privateKeyPath } from '../utils/system-ssh-connection.js'

const validateInputs = (neededInputs) => {
    const messages = []

    neededInputs.forEach((input) => {
        if (!core.getInput(input)) {
            messages.push(input)
        }
    })

    if (messages.length > 0) {
        throw new Error(`Missing required inputs: ${messages.join(', ')}`)
    }
}

const prepareSpace = async (options) => {
    await startCommandGreetings(options)

    try {
        // System minimum requirements
        validateInputs(['host', 'port', 'username', 'key'])

        // Playbook requirements
        validateInputs(['password', 'public_key'])

        prepareUserKey()

        // The trailing comma is necessary for the playbook to work, it must be a list
        const inventory = `${core.getInput('host')},`

        await exec.exec(
            'ansible-playbook',
            [
                `-i ${inventory}`,
                '--user=root',
                `--private-key=${privateKeyPath}`,
                '/src/ansible/playbooks/_maintenance/create-user.yml',
                '-e',
                `target_hosts=all`,
                '-e',
                `public_key_path=${publicKeyPath}`,
            ],
            { cwd: '/src/ansible' },
        )
    } catch (error) {
        process.env.CI ? core.setFailed(error.message) : console.log(error)
    }
}

export default prepareSpace
