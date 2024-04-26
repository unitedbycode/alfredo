import { Command } from 'commander'
import prepareSpace from './actions/prepare-space.js'
import installUser from './actions/install-user.js'
const program = new Command()

program.name('string-util').description('CLI to some JavaScript string utilities').version('0.8.0')

program
    .command('prepare-space')
    .description('Prepares a Space on the target system')
    .action((options) => prepareSpace(options))

program
    .command('install-user')
    .description('Installs a user on the target system')
    .action((options) => installUser(options))

program.parse()
