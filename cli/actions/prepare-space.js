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
        const home = os.homedir()

        // If it doesn't finish with a new line, append it
        if (!key.endsWith('\n')) {
            key += '\n'
        }

        // Create .ssh directory and write the key to id_rsa file
        fs.mkdirSync(`${home}/.ssh`, { recursive: true, mode: 0o700})
        fs.writeFileSync(`${home}/.ssh/id_rsa`, key, { encoding: 'utf-8', mode: 0o600 })

        // Scan the host to add it to a freshly created known_hosts
        fs.writeFileSync(`${home}/.ssh/known_hosts`, '', { encoding: 'utf-8', mode: 0o644 })
        await execute(`ssh-keyscan -p ${port} ${host} >> ${home}/.ssh/known_hosts`)


        console.log(`echoing stuffff`)
        console.log(`${home}/.ssh`)
        console.log(`${home}/.ssh/id_rsa`)

        console.log(process.env)
        console.log("Host:", host)
        console.log("Port:", port)
        console.log("Username:", username)
        console.log("Key:", key)


        await execute(`ssh -i ${home}/.ssh/id_rsa -p ${port} ${username}@${host} "ls -alh spaces"`)

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
