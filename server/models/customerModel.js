import { Schema, model } from 'mongoose';
import validator from 'validator';

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    birthday: Date,
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: value => validator.isMobilePhone(value, 'tr-TR'),
            message: 'lütfen geçerli bir telefon numarası girin'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'lütfen geçerli bir email adresi girin']
    },
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
}, { timestamps: true })

export default model('customer', customerSchema)