import figlet from 'figlet'
import core from '@actions/core'

const startCommandGreetings = async (message = '') => {
    await figlet('Alfredo', (err, data) => {
        if (err) {
            core.setFailed(err)
        }
        console.log(data)
    })

    core.info(message)
}

const validateInputs = (neededInputs) => {
    const messages = []

    neededInputs.forEach((input) => {
        if (!core.getInput(input)) {
            messages.push(input)
        }
    })

    if (messages.length > 0) {
        throw new Error(`Missing required inputs: ${messages.join(', ')}`)
    }
}

export { startCommandGreetings, validateInputs }
