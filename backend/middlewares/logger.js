import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { randomUUID } from 'crypto';

function getDate() {
    const date = new Date();

    return `${date.toLocaleDateString('en-GB')} - ${date.toLocaleTimeString('tr-TR')}`
}

async function logEvents(message, logFileName) {
    const eventDate = getDate();
    const logItem = `${eventDate}\t${randomUUID()}\t${message}\n`;

    try {
        if (!fs.existsSync('./logs'))
            await fsp.mkdir('./logs');

        await fsp.appendFile(`./logs/${logFileName}`, logItem);
    } catch (e) {
        console.error(e)
    }
}

function logger(fileName) {
    return function (req, res, next) {
        logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, fileName)
        console.log(req.method, req.path);
        next();
    }
}

export { logger, logEvents }
