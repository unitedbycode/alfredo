import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'
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

        cd('/src/ansible')

        res = await $`pwd ; ls -alh`
        echo(res)

        res = await $`hosts/get-hosts.mjs`
        echo(res)

        console.log(process.env.HOME)

        const home = os.homedir()
        console.log(home)
    } catch (error) {
        core.setFailed(error.message)
    }
}

export default prepareSpace
