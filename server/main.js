import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { jobRouter, usersRouter, employeesRouter } from './routes/index.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || 'localhost';
const dbConnectStr = process.env.DB_CONN_STR_LOCAL || process.env.DB_CONN_STR;

app.use(express.json());
app.use('/jobs', jobRouter);
app.use('/users', usersRouter);
// app.use('/employees',);
// app.use('/customers',);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, async () => {
    try {
        await mongoose.connect(dbConnectStr);
        console.log('connected to db');
    } catch (err) {
        throw new Error(err);
    }
    console.log(`Server running at http://${HOST}:${PORT}/`);
});