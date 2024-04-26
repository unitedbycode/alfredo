import core from '@actions/core'
import execute from '../utils/actions-exec-output.js'
import { getSSHCommandString } from '../utils/system-ssh-connection.js'
import { NodeSSH } from 'node-ssh'
import figlet from 'figlet'
import { $, cd, spinner, sleep } from 'zx'

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
        cd('/src/ansible')
        let res
        res = await $`pwd ; ls -alh`
        console.log(res.toString())
    } catch (error) {
        core.setFailed(error.message)
    }
}

export default prepareSpace
