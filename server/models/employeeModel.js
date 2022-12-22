import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const employeeSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isEmail, 'lütfen geçerli bir e mail giriniz'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'parola en az 8 haneli olmalıdır']
    },
    phone: {
        type: String,
        required: [true, 'lütfen bir telefon numarası girin'],
        validate: {
            validator: value => validator.isMobilePhone(value, 'tr-TR'),
            message: 'telefon numarası geçerli değil'
        }
    },
    birthday: Date,
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    role: {
        type: String,
        trim: true,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true })

employeeSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

employeeSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('e mail kayıtlı değil');
    const data = await bcrypt.compare(password, this.password);
    if (!data) throw new Error('parola hatalı');

    return user._id;
}

export default model('employee', employeeSchema)