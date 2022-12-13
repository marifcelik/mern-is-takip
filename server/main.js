import { resolve as pathResolve } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { jobsRouter, customersRouter, employeesRouter } from './routes/index.js';

dotenv.config({ path: pathResolve(new URL(import.meta.url).hostname, `${process.env.NODE_ENV}.env`), debug: true });
const app = express();

const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || 'localhost';
const DB_CONN_STR = process.env.DB_CONN_STR || 'mongodb://127.0.0.1:27017/is-takip';

app.use(express.json());
app.use(cookieParser());
app.use('/jobs', jobsRouter);
app.use('/customers', customersRouter);
app.use('/emp', employeesRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, async () => {
    try {
        await mongoose.connect(DB_CONN_STR);
        console.log('connected to db');
    } catch (err) {
        throw new Error(err);
    }
    console.log(`Server running at http://${HOST}:${PORT}/`);
});