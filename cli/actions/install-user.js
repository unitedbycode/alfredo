import core from '@actions/core'
import { $, cd, spinner, sleep } from 'zx'
import figlet from 'figlet'
import { getSSHCommandString, prepareUserKey } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'
import os from 'os'
import execute from '../utils/actions-exec-output.js'

const echo = (out) => console.log(out.toString())

const prepareSpace = async (options) => {
    await figlet('Alfredo', (err, data) => {
        if (err) {
            core.setFailed(err)
        }
        console.log(data)
    })

    console.log('Command options: ', options)
    console.log('Installing user...')

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
