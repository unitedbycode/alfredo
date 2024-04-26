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

        // It fails here, but it works in regular github workflows, check:
/*
    steps:
      - uses: actions/checkout@v4

      - name: Prepare SSH connections for deployment
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.DEPLOY_PVT_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -p 22 ${{ secrets.DEPLOY_SERVER }} >> ~/.ssh/known_hosts

      - name: Set up environment variables for later
        run: |
          echo "SHA_SHORT=$(git rev-parse --short $GITHUB_SHA)" >> $GITHUB_ENV

          (...)

      - name: Post deployment script
        run: |
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_SERVER }} '''
            cd ~/spaces/${{ env.space }}
            docker compose exec -u ${{ secrets.DEPLOY_USER }} ${{ env.image }} bash -c "scripts/post-deployment.sh"
          '''

* */
        // Scan the host to add it to a freshly created known_hosts
        // fs.writeFileSync(`${home}/.ssh/known_hosts`, '', { encoding: 'utf-8', mode: 0o644 })
        // await execute(`ssh-keyscan -p ${port} ${host} >> ${home}/.ssh/known_hosts`)


        // ssh options
        const sshOptions = `-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no`

        await execute(`ssh ${sshOptions} -i ${home}/.ssh/id_rsa -p ${port} ${username}@${host} "ls -alh spaces"`)

        process.exit(0)



        let res


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
