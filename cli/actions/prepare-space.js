import fs from 'fs'
import os from 'os'
import { $ } from "zx"
import core from "@actions/core"
import execute from "./actions-exec-output.js"

// Main action execution flow wrapped in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const host = core.getInput('host')
        const port = core.getInput('port')
        const username = core.getInput('username')
        const key = core.getInput('key')

        fs.mkdirSync(`${os.homedir()}/.ssh`, { recursive: true, mode: 0o700})
        fs.writeFileSync(`${os.homedir()}/.ssh/id_rsa`, key, { encoding: 'utf-8', mode: 0o600 })

        const SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
        await execute(`ssh ${SSH_OPTIONS} -i ${os.homedir()}/.ssh/id_rsa -p ${port} ${username}@${host} "ls -alh spaces"`)

        //base64 encoded private key
        // const keyB64String = Buffer.from(key, 'base64').toString('utf-8')
        // await execute(`echo "${keyB64String}" | base64 > ~/.ssh/id_rsa`)

        process.exit(0)


        let res

        const sshOptions = `-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`

        console.log("[command]Starting SSH commands...")
        await execute(`ssh ${sshOptions} -i ~/.ssh/id_rsa -p ${port} ${username}@${host} "ls -alh"`)

        res = await $`ssh ${sshOptions} -i ~/.ssh/id_rsa -p ${port} ${username}@${host} '''
        ls -alh
        ls -alh spaces
        pwd
        whoami
        '''`
        console.log(res.toString())

        // res = await $`cat ~/.ssh/id_rsa`
        // console.log(res.toString())

        // Record time when greeting was done as part of outputs
        const time = new Date().toTimeString()
        core.setOutput("time", time)

    } catch (error) {
        // Handle errors properly by setting failure status on error occurrence
        core.setFailed(error.message)
    }
})()

const prepareSpace = async (options) => {

    console.log(process.cwd())
    console.log(process.env)

    console.log("Preparing Space...")
    console.log("Options: ", options)

}

export default prepareSpace
