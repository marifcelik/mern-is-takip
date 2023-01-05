import express from 'express';
import Customer from '../models/customerModel.js';
import handleError from './errorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        const { code, errors } = handleError(err)
        res.status(code).json({ message: 'bir hata oluştu', errors });
    }
});

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        if (!data)
            return res.status(400).json({ message: 'really bad request' })

        if (Object.keys(data).length > Object.keys(Customer.schema.paths).length - 5)
            return res.status(418).json({ message: 'too many arguments' });

        const customer = await Customer.create(data);

        res.status(200).json({ message: 'successful', data: customer });
    } catch (err) {
        const { code, errors } = handleError(err)
        res.status(code).json({ message: 'kayıt esnasında bir hata oluştu', errors });
    }
});

router.patch('/edit', async (req, res) => {
    try {
        const data = req.body;
        const customer = await Customer.findOneAndUpdate({ _id: data._id }, data);
        res.status(200).json({ message: 'güncellendi', id: customer._id })
    } catch (error) {
        const { code, errors } = handleError(error);
        res.status(code).json({ message: 'düzenleme hatası', errors })
    }
});

router.delete('/rm', async (req, res) => {
    try {
        const { id } = req.body
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer)
            return res.status(400).json({ message: 'user not found' })

        res.status(206).json({ message: 'başarılı', id: customer._id })
    } catch (err) {
        const { code, errors } = handleError(err);
        res.status(code).json({ message: 'silme hatası', errors })
    }
})

export default router