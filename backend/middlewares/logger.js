import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as fsp from 'fs/promises';

function getDate() {
    const date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    month < 10 && (month = `0${month}`);
    day < 10 && (day = `0${day}`);
    hour < 10 && (hour = `0${hour}`);
    minute < 10 && (minute = `0${minute}`);
    second < 10 && (second = `0${second}`);

    return `${day}/${month}/${year} - ${hour}:${minute}:${second}`
}

async function logEvents(message, logFileName) {
    const eventDate = getDate();
    const logItem = `${eventDate}\t${uuid()}\t${message}\n`;

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
