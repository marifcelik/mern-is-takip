import express from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        let { username, password, phone } = req.body;
        const userExits = await User.findOne({ username });
        if (userExits)
            return res.status(409).json({ message: 'user already exists.' });

        password = await bcrypt.hash(password, 10);
        const data = await User.create({ username, password, phone, role: 'USER' });
        res.status(201).json({ message: 'kayıt başarılı', data });
    } catch (err) {
        console.error(err);
        res.status(502).json({ message: 'kayıt esnasında sorun oluştu', error: new Error(err) })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'user not exists.' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: 'password not correct' });

        res.status(200).json({ message: 'successful' });
    } catch (err) {
        console.error(err);
        res.status(501).json({ message: 'giriş esnasında bir hata oluştu', error: err.toString() });
    }
})

export default router;