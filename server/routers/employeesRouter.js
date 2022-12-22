import express from 'express';
import Employee from '../models/employeeModel.js';
import handleError from './errorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('çalışanlar');
});

router.put('/add', async (req, res) => {
    const { name, surname, email, password, phone, age, role } = req.body;

    let data = await Employee.create({ name, surname, email, password, phone, age, role });

    res.status(200).json({ message: 'ok', data });
});

export default router