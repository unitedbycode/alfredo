const fs = require('fs')
const path = '/Users/joaopatricio/code/mcs/intra24/.github/workflows/staging.yml'
const $ = import("zx")
const simpleGit = require('simple-git')
const semver = require('semver')

// Create a Simple Git instance pointing to local repo
const git = simpleGit()

async function bumpVersion() {

    const tagStrings = (await git.tag()).split('\n').filter(Boolean)

    let maxTagSemVerString

    for(const tag of tagStrings) {
        if(semver.valid(tag)) {  // Check if it is valid SemVer format.
            if(!maxTagSemVerString || semver.gt(tag, maxTagSemVerString)) {  // If current version > maximum found version,
                maxTagSemVerString=tag                                     // then set as new maximum found version.
            }
        } else{
            // console.log(`Skipping invalid SemVar ${tag}`)
        }
    }
    // console.log("Current Version: ",maxTagSemVerString)

    return semver.inc(maxTagSemVerString,'patch')
}

const replaceInFile = (path, search, replace) => {

    // Read existing content from file
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading from ${path}: `, err)
            return
        }

        // Replace 'XXX' with 'YYY'
        const result = data.replace(search, replace)

        // Write new content back into same file
        fs.writeFile(path, result,'utf8', err => {
            if(err){
                console.error(`Error writing to ${path}: `, err)
                return
            }

            console.log('File has been updated successfully.')
        })
    })
}

bumpVersion()
    .then(nextVersion => {
        $`git tag v${nextVersion}`
        $`git push --tags`
        replaceInFile(path, /(alfredo@v)(\d+\.\d+\.\d+)/g, nextVersion)
    })
    .catch(console.error.bind(console))

