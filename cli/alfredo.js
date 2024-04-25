import core from "@actions/core"
import github from "@actions/github"
import exec from "@actions/exec"
import { $ } from "zx"
import { fileURLToPath } from "url"
import { dirname } from "path"

// Function for executing shell commands
async function execute(cmd) {
    let output = ""
    const options = {}

    // Capture output instead of letting it go to stdout.
    options.listeners = {
        stdout: (data) => {
            output += data.toString()
        }
    }

    await exec.exec(cmd, [], options)
    return output
}

// Main action execution flow wrapped in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {

        const foo = await $`whoami`
        console.log(foo.toString())

        const runner_workspace = process.env.RUNNER_WORKSPACE
        const github_workspace = process.env.GITHUB_WORKSPACE

        await execute("pwd")

        await execute(`ls ${runner_workspace}`)
        await execute(`ls ${github_workspace}`)

        // print where this file is being executed
        console.log(process.env)
        console.log(process.cwd())

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = dirname(__filename)

        console.log("[command]running this command...")
        console.log("__filename:", __filename) // Should print the directory containing this script.
        console.log("__dirname:", __dirname) // Should print the directory containing this script.

        // await execute("ansible --help")

        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const nameToGreet = core.getInput("who-to-greet")
        console.log(`Hello ${nameToGreet}!`)

        // Fetch the value from input 'who-to-greet' specified in action.yml file
        const nameToGreet2 = core.getInput("WHO-TO-GREET")
        console.log(`Hello2 ${nameToGreet2}!`)

        // Record time when greeting was done as part of outputs
        const time = new Date().toTimeString()
        core.setOutput("time", time)

    } catch (error) {
        // Handle errors properly by setting failure status on error occurrence
        core.setFailed(error.message)
    }
})()
