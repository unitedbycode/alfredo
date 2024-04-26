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
        let key = core.getInput('key')

        // If it doesn't finish with a new line, append it
        if (!key.endsWith('\n')) {
            key += '\n'
        }

        fs.mkdirSync(`${os.homedir()}/.ssh`, { recursive: true, mode: 0o700})
        fs.writeFileSync(`${os.homedir()}/.ssh/id_rsa`, key, { encoding: 'utf-8', mode: 0o600 })

        console.log(`echoing stuffff`)
        console.log(`${os.homedir()}/.ssh`)
        console.log(`${os.homedir()}/.ssh/id_rsa`)

        console.log(process.env)
        console.log("Host:", host)
        console.log("Port:", port)
        console.log("Username:", username)
        console.log("Key:", key)

        await execute(`pwd`)
        await execute(`whoami`)
        await execute(`ls -alh /root/.ssh`)
        await execute(`cat /root/.ssh/id_rsa`)


        const SSH_OPTIONS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
        await execute(`ssh ${SSH_OPTIONS} -i ${os.homedir()}/.ssh/id_rsa -p ${port} ${username}@${host} "ls -alh spaces"`)

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

    console.log("Preparing Space...")
    console.log("Command options: ", options)

}

export default prepareSpace
