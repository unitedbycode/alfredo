import { Command } from 'commander'
// import remoteTasks from './actions/remote-tasks.js'
import installUser from './actions/install-user.js'
import installNginxProxyManager from './actions/install-nginx-proxy-manager.js'
import installComposeApp from './actions/install-compose-app.js'

const program = new Command()

program.name('string-util').description('CLI to some JavaScript string utilities').version('0.8.0')

// program.command('remote-tasks').description('Run some tasks on a remote server - research').action(remoteTasks)

program.command('install-user').description('Installs a user on the target system.').action(installUser)

program
    .command('install-nginx-proxy-manager')
    .description('Installs a user on the target system.')
    .action(installNginxProxyManager)

program
    .command('install-compose-app')
    .description('Installs a Docker Compose based app on the target system.')
    .action(installComposeApp)

program.parse()
