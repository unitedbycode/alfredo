import core from "@actions/core"
import { $ } from "zx"

// Main action execution flow wrapped in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const nameToGreet2 = core.getInput("who_to_greet")
        console.log(`Hello2 ${nameToGreet2}!`)

        let res
        res = await $`mkdir -p ~/.ssh`

        res = await $`echo ${process.env.key} > ~/.ssh/id_rsa`
        console.log(res.toString())

        res = await $`cat ~/.ssh/id_rsa`
        console.log(res.toString())



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
