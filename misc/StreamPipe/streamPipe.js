import * as fs from "fs"
import { createGzip } from 'node:zlib'

const gzip = createGzip()
const dataRead = await fs.createReadStream('./file1.txt', {encoding: 'utf8'})
const dataWrite = await fs.createWriteStream('./file2.txt')

dataRead
    .on('data', chunk => {
    console.log(chunk)
    dataWrite.write(chunk)
})

dataRead
    .pipe(gzip)
    .pipe(fs.createWriteStream('./file.txt.zip'))
