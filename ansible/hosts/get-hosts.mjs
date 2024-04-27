#!/usr/bin/env zx
import os from 'os'

const home = os.homedir()

const hosts_object = {
    default: {
        hosts: [process.env.INPUT_HOST],
        vars: {
            ansible_user: process.env.INPUT_USERNAME,
            ansible_ssh_private_key_file: `${home}/.ssh/id_rsa`,
        }
    },
    _meta: {
        // Hostvars is convinient for setting variables for a specific host
        // At this point, we only have one host, so we don't have a use for it
        //
        //     hostvars: {
        //         [process.env.INPUT_HOST]: {},
        //     },
    }
};

console.log(JSON.stringify(hosts_object));
