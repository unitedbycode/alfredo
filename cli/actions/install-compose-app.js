import core from '@actions/core'
import exec from '@actions/exec'
import { startCommandGreetings, validateInputs } from '../utils/common.js'
import { prepareUserKey, privateKeyPath } from '../utils/system-ssh-connection.js'
import { $, cd } from 'zx'

const task = async () => {
    await startCommandGreetings('Installing Docker Compose App...')

    // System minimum requirements
    validateInputs(['host', 'port', 'username', 'key'])

    try {
        // Playbook requirements
        validateInputs([])

        prepareUserKey()

        let out

        out = await $`
        pwd ; ls -alh
        echo "------------------"
        echo "------------------"
        cd /github/workspace
        docker run --rm -v $PWD:/app -w /app composer bash -c "pwd ; whoami; ls -alh"
        `
        core.info(out)

        out = await $`
        docker run --rm -v $PWD:/app -w /app composer bash -c "composer install --ignore-platform-reqs --no-scripts"
        `
        core.info(out)

        cd('/src/ansible')

        return
        // await exec.exec(`ls -alh /github/workspace`)

        await exec.exec(`ls -alh /tmp/app/.alfredo/scripts`)
        await exec.exec('install.sh', [], { cwd: '/tmp/app/.alfredo/scripts' })

        return

        const projectPath = '/github/workspace'
        await exec.exec(
            `docker run --rm -v /tmp/app:/app -w /app composer install --ignore-platform-reqs --no-scripts`,
            [],
            { cwd: projectPath },
        )

        return
        await exec.exec(`cd /github/workspace`)
        await exec.exec(`ls -alh`)
        await exec.exec(`ls -alh`)

        const user = core.getInput('username')

        // The trailing comma is necessary for the playbook to work, it must be a list.
        const inventory = `${core.getInput('host')},`

        await exec.exec(
            'ansible-playbook',
            [
                `-i ${inventory}`,
                `--user=${user}`,
                `--private-key=${privateKeyPath}`,
                '/src/ansible/playbooks/install-compose-app/install-compose-app.yml',
                '-e',
                `username=${core.getInput('username')}`,
                '-e',
                `target_hosts=all`,
            ],
            { cwd: '/src/ansible' },
        )
    } catch (error) {
        process.env.CI ? core.setFailed(error.message) : console.log(error)
    }
}

export default task
