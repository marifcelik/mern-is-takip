import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mwAuth from './middlewares/auth.js';
import { logger, logEvents } from './middlewares/logger.js';
import { jobsRouter, customersRouter, employeesRouter, notesRouter, authRouter } from './routers/index.js';
import { PORT, HOST, DB_CONN_STR, JWT_SECRET_KEY } from './config.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger('requests.log'));
app.use('/api/auth', authRouter);
app.use('/api/jobs', mwAuth(JWT_SECRET_KEY), jobsRouter);
app.use('/api/notes', mwAuth(JWT_SECRET_KEY), notesRouter);
app.use('/api/customers', mwAuth(JWT_SECRET_KEY, { admin: true }), customersRouter);
app.use('/api/employees', mwAuth(JWT_SECRET_KEY, { admin: true }), employeesRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    try {
        await mongoose.connect(DB_CONN_STR);
        console.log('Connected to MongoDB');
    } catch (err) {
        await logEvents(err.toString(), 'mongoErrors.log');
        throw new Error(err);
    }
    console.log(`Server running at http://${HOST}:${PORT}/`);
});