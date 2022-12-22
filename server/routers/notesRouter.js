import express from 'express';
import Note from '../models/noteModel.js'
import handleError from './errorHandler.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const notes = await Note.find({ _id: id });
        res.status(200).json(notes);
    } catch (err) {
        const { code, errors } = handleError(err);
        res.status(code).json({ errors });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { body, employeeId } = req.body;
        const note = await Note.create({ body, employeeId });
        res.status(201).json({ message: 'oluşturuldu', note })
    } catch (err) {
        const { code, errors } = handleError(err);
        res.status(code).json(errors);
    }
});

router.patch('/edit', async (req, res) => {
    try {
        const { id } = req.body;
        const note = await Note.findByIdAndUpdate(id);
        res.status(200).json({ message: 'güncellendi', note })
    } catch (err) {
        const { code, errors } = handleError(err);
        res.status(code).json(errors);
    }
})

router.delete('/rm', async (req, res) => {
    try {
        const { id } = req.body;
        const note = await Note.findByIdAndRemove(id);
        res.status(206).json({ message: 'removed', id: note._id })
    } catch (err) {
        const { code, errors } = handleError(err);
        res.status(code).json(errors);
    }
})

export default router