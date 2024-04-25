const fs = require('fs')
const path = '/Users/joaopatricio/code/mcs/intra24/.github/workflows/staging.yml'
const $ = require("zx")

// Read existing content from file
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading from ${path}: `, err)
        return
    }

    // Replace 'XXX' with 'YYY'
    const result = data.replace(/alfredo@v0.0.8/g, 'YYY')

    // Write new content back into same file
    fs.writeFile(path, result,'utf8', err => {
        if(err){
            console.error(`Error writing to ${path}: `, err)
            return
        }

        console.log('File has been updated successfully.')
    })
})


