import express from 'express';
import mongoose from 'mongoose';
import Job from '../models/jobModel.js';

const router = express.Router();

router.get('/', async (req, res) => { res.status(200).json({ durum: 'çalıştı' }) });

export default router;