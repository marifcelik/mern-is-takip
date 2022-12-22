import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mwAuth from './middlewares/auth.js';
import { jobsRouter, customersRouter, employeesRouter, notesRouter } from './routers/index.js';
import { logger, logEvents } from './middlewares/logger.js';
import Employee from './models/employeeModel.js';
import { PORT, HOST, DB_CONN_STR, JWT_SECRET_KEY } from './config.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger('request.log'));
app.use('/api/jobs', mwAuth(JWT_SECRET_KEY), jobsRouter);
app.use('/api/notes', mwAuth(JWT_SECRET_KEY), notesRouter);
app.use('/api/customers', mwAuth(JWT_SECRET_KEY, { admin: true }), customersRouter);
app.use('/api/employees', mwAuth(JWT_SECRET_KEY, { admin: true }), employeesRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/login', async (req, res) => {
    let { email, password } = req.body;
    if (!(email && password))
        res.status(400).json({ message: 'email or password cannot empty' })

    try {
        const data = await Employee.findOne({ email, password });
        if (!data)
            return res.status(404).json({ fail: 'email ya da parola hatalı' });

        const token = jwt.sign(
            { email, id: data._id, isAdmin: data.role === 'ADMIN' },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', maxAge: 30 * 60 * 1000 })
        res.status(200).send({ message: 'success', id: data._id, name: data.name })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.toString() });
    }
});

app.post('api/register', async (req, res) => {
    const data = req.body;
    try {
        const user = await Employee.create(data);
        if (user)
            res.status(201).json({ message: 'ok', data: user })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() })
    }
});

app.post('/api/loguot', async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(205).redirect('/');
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