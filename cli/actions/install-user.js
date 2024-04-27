import core from '@actions/core'
import exec from '@actions/exec'
import { startCommandGreetings, echo } from '../utils/common.js'
import { prepareUserKey, publicKeyPath } from '../utils/system-ssh-connection.js'
import { groupName } from '../utils/get-ansible-hosts.js'
import { $, cd } from 'zx'
import execute from '../utils/actions-exec-output.js'

const prepareSpace = async (options) => {
    await startCommandGreetings(options)

    try {
        let res

        prepareUserKey()

        // res = await exec.exec('/src/ansible/hosts/get-hosts.mjs')
        // echo(res)
        // process.exit(0)

        // cd('/src/ansible')

        // [`-e "target_hosts=${groupName}"`, `-e "public_key_path=${publicKeyPath}"`],
        // console.log(`-e="target_hosts=${groupName}"`, `-e="public_key_path=${publicKeyPath}"`)

        res = await exec.exec(
            `ansible-playbook /src/ansible/playbooks/_maintenance/create-user.yml`,
            [`-e "target_hosts=${groupName}"`, `-e "public_key_path=${publicKeyPath}"`],

            { cwd: '/src/ansible' },
        )

        echo(res)

        // res = await exec.exec('ansible -m ping alladas')
        // console.log(res)
    } catch (error) {
        core.setFailed(error.message)
        console.log(error)
    }
}

export default prepareSpace
