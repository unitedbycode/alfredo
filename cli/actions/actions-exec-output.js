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

export default execute
