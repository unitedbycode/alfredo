import figlet from 'figlet'
import core from '@actions/core'

const echo = (out) => console.log(out.toString())

const startCommandGreetings = async (options) => {
    await figlet('Alfredo', (err, data) => {
        if (err) {
            core.setFailed(err)
        }
        console.log(data)
    })

    console.log('Command options: ', options)
    console.log('Installing user...')
}

export { startCommandGreetings, echo }
