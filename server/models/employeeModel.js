import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
    name: String,
    password: String,
    phone: String,
    age: Number,
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
})

export default model('user', employeeSchema)