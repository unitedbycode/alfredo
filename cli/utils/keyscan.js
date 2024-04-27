import execute from './actions-exec-output.js'
import os from 'os'

export default async function keyscan(host, port) {
    const home = os.homedir()

    // It fails here, but it works in regular GitHub workflows, check:
    /*
        steps:
          - uses: actions/checkout@v4

          - name: Prepare SSH connections for deployment
            run: |
              mkdir -p ~/.ssh
              echo "${{ secrets.DEPLOY_PVT_KEY }}" > ~/.ssh/private_key
              chmod 600 ~/.ssh/private_key
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
}
