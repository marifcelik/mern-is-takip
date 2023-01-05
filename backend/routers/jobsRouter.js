import express from 'express';
import Job from '../models/jobModel.js';
import handleError from './errorHandler.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Job.find({ cutomer: id }).select(['title', 'done']).lean();
        if (!data)
            return res.status(404).json({ message: 'job not found' });
        res.status(200).json({ message: 'id ile arama başarılı', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', error: err.toString() });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Job.find();
        res.status(200).json({ message: 'başarılı', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', error: err.toString() });
    }
});

router.put('/add', async (req, res) => {
    const { title, details } = req.body;
    try {
        let data = await Job.create({ title, details });
        res.status(201).json({ message: 'created', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'adding failed error', error: err.toString() });
    }
})

router.patch('/edit', async (req, res) => {
    const { title, details } = req.body;
    res.end('yapılacak');
})

router.delete('/rm', async (req, res) => {
    const id = req.body.id;
    try {
        let data = await Job.findById(id);
        if (!data)
            return res.status(404).json({ message: 'user not found' });

        data = await Job.findByIdAndDelete(id)
        res.status(200).json({ message: 'deleted', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
})

export default router;