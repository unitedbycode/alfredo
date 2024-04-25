import { Command } from 'commander'
const program = new Command()

import prepareSpace from './actions/prepare-space.js'

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0')

program.command('prepare-space')
    .description('Prepares a Space on the target system')
    .action((options) => prepareSpace(options))

program.parse()
