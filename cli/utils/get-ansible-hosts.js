import os from 'os'

const groupName = 'default'

const getHosts = ({ useRoot = true }) => {
    const home = os.homedir()

    const ansible_user = useRoot ? 'root' : process.env.INPUT_USERNAME

    const hosts_object = {
        [groupName]: {
            hosts: [process.env.INPUT_HOST],
            vars: {
                ansible_user,
                ansible_ssh_private_key_file: `${home}/.ssh/private_key`,
            },
        },
        _meta: {
            // Hostvars is convinient for setting variables for a specific host
            // At this point, we only have one host, so we don't have a use for it
            //
            //     hostvars: {
            //         [process.env.INPUT_HOST]: {},
            //     },
        },
    }

    console.log(JSON.stringify(hosts_object))
}

export { groupName, getHosts }
export default getHosts
