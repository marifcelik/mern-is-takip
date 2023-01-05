import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    body: { type: String, required: [true, 'not içeriği girilmeli'] },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', reqired: true }
}, { timestamps: true });

export default model('note', noteSchema);