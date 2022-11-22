import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['USER', 'ADMIN'],
        default: 'USER'
    }
})

export default mongoose.model('user', userSchema)