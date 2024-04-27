#!/usr/bin/env node
import core from '@actions/core'
import { $, cd, spinner, sleep } from 'zx'

const hosts_object = {
    default: [
        {
            hosts: [process.env.INPUT_HOST],
            vars: {
                ansible_user: process.env.INPUT_USERNAME,
                ansible_ssh_private_key_file: process.env.INPUT_KEY,
            },
        },
    ],
    _meta: {
        hostvars: {
            [process.env.INPUT_HOST]: {},
        },
    },
}

console.log(JSON.stringify(hosts_object))
