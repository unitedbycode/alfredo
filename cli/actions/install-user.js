import core from '@actions/core'
import exec from '@actions/exec'
import { startCommandGreetings, echo } from '../utils/common.js'
import { prepareUserKey, publicKeyPath } from '../utils/system-ssh-connection.js'
import { groupName } from '../utils/get-ansible-hosts.js'

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

        await exec.exec(
            `ansible-playbook /src/ansible/playbooks/_maintenance/create-user.yml`,
            [`-e target_hosts=${groupName}`, `-e public_key_path=${publicKeyPath}`],
            { cwd: '/src/ansible' },
        )
    } catch (error) {
        process.env.CI ? core.setFailed(error.message) : console.log(error)
    }
}

export default prepareSpace
