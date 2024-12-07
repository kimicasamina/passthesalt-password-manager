import path from 'path'
import fs from 'fs'
import { promises } from 'fs'
import { v4 as uuid_v4 } from 'uuid'
const { mkdir, appendFile } = promises
import { formatDate, formatDateShort } from '../utils/dateFormatter'
import { formatTime } from '../utils/dateFormatter'

// const fsPromises = fs.promises

function toTimestamp(strDate) {
    var datum = Date.parse(strDate)
    return datum / 1000
}

export const logEvents = async (msg, logName) => {
    const d = new Date()
    console.log(formatDate(d))
    console.log(formatTime(d))
    const dateTime = `${formatDateShort(d)}\t${formatTime(d)}`
    const logItem = `${dateTime}\t${uuid_v4()}\t${msg}}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', 'logs'))
        }
        await appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (error) {
        console.log(error)
    }
}
export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next()
}
