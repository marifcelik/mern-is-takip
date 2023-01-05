import express from 'express';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel.js';
import { JWT_SECRET_KEY } from '../config.js';

const router = express.Router();

router.post('/login', async (req, res) => {
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
        res.cookie('jwt', token, { maxAge: 30 * 60 * 1000 })
        res.status(200).send({ message: 'success', id: data._id, name: data.name })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.toString() });
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.cookie('jwt', '', { sameSite: 'none', maxAge: 10 });
        res.status(200).json('succes');
    } catch (err) {
        res.status(500).json({ fail: true, error: err.toString() });
    }
});

router.post('/register', async (req, res) => {
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

export default router