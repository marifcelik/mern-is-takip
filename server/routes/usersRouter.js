import express from 'express';
import * as bcrypt from 'bcrypt';
import { userModel } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await userModel.findOne({ username: 'admin' });
    res.status(200).send({ data });
});

export default router;