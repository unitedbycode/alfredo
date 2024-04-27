import core from '@actions/core'
import { startCommandGreetings, echo } from '../utils/common.js'
import { prepareUserKey } from '../utils/system-ssh-connection.js'
import { $, cd } from 'zx'
import os from 'os'

const prepareSpace = async (options) => {
    await startCommandGreetings(options)

    try {
        let res

        prepareUserKey()

        cd('/src/ansible')

        res = await $`ls -alh ${os.homedir()}/.ssh`
        echo(res)

        res = await $`hosts/get-hosts.mjs`
        echo(res)

        res = await $`ansible -m ping all`
        echo(res)
    } catch (error) {
        core.setFailed(error.message)
        console.log(error)
    }
}

export default prepareSpace
