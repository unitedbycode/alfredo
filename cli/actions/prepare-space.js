import core from "@actions/core"
import { $ } from "zx"

// Main action execution flow wrapped in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const host = core.getInput('host')
        const port = core.getInput('port')
        const username = core.getInput('username')
        const key = core.getInput('key')

        let res
        await $`mkdir -p ~/.ssh`
        await $`echo ${key} > ~/.ssh/id_rsa ; chmod 600 ~/.ssh/id_rsa`
        await $`touch ~/.ssh/known_hosts ; chmod 600 ~/.ssh/known_hosts`
        await $`ssh-keyscan -p ${port} ${host} >> ~/.ssh/known_hosts`

        res = await $`ssh -i ~/.ssh/id_rsa -p ${port} ${username}@${host} '''
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
