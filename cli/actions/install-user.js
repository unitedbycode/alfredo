import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString, prepareUserKey } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'
import figlet from 'figlet'
import { $, cd, spinner, sleep } from 'zx'
import os from 'os'

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

        await prepareUserKey()

        cd('/src/ansible')

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
