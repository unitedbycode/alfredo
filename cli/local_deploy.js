import fs from "fs"
import semver from "semver"
import simpleGit from "simple-git"
// Create a Simple Git instance pointing to local repo
const git = simpleGit()
// Load .env file
import dotenv from "dotenv"
dotenv.config()

const actionFile = process.env.ACTION_FILE
const deployDir = process.env.DEPLOY_DIR

async function bumpVersion() {

    const tagStrings = (await git.tag()).split("\n").filter(Boolean)

    let maxTagSemVerString

    for (const tag of tagStrings) {
        if (semver.valid(tag)) {  // Check if it is valid SemVer format.
            if (!maxTagSemVerString || semver.gt(tag, maxTagSemVerString)) {  // If current version > maximum found version,
                maxTagSemVerString = tag                                     // then set as new maximum found version.
            }
        } else {
            // console.log(`Skipping invalid SemVar ${tag}`)
        }
    }
    // console.log("Current Version: ",maxTagSemVerString)

    return semver.inc(maxTagSemVerString, "patch")
}

const replaceInFile = (path, search, replace) => {

    // Read existing content from file
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading from ${path}: `, err)
            return
        }

        // Replace 'XXX' with 'YYY'
        const result = data.replace(search, replace)

        // Write new content back into same file
        fs.writeFile(path, result, "utf8", err => {
            if (err) {
                console.error(`Error writing to ${path}: `, err)
                return
            }

            console.log("File has been updated successfully.")
        })
    })
}


bumpVersion()
    .then(nextVersion => {

        import("zx").then(async zx => {
            const $ = zx.$

            await $`git tag v${nextVersion}`
            await $`git push`
            await $`git push --tags`

            // Pause 2 seconds, so that the tag is processed server-side, before the action is run.
            console.log("Pausing for 2 seconds...")
            await new Promise(resolve => setTimeout(resolve, 2000))

            replaceInFile(actionFile, /(alfredo@v)(\d+\.\d+\.\d+)/g, `alfredo@v${nextVersion}`)

            zx.cd(deployDir)
            await $`git add . && git commit -m "wip" && git push origin staging`
        })

    })
    .catch(console.error.bind(console))

