import { $ } from "zx"
import { fileURLToPath } from "url"
import { dirname } from "path"

// Main action execution flow wrapped in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {

        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const nameToGreet2 = core.getInput("WHO_TO_GREET")
        console.log(`Hello2 ${nameToGreet2}!`)

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
    console.log("Options: ", options)

}

export default prepareSpace
