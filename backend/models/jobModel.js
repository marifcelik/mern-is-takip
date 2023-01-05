import { Schema, model } from "mongoose";

const jobSchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    steps: [{ type: [String], required: true }],
    done: { type: Boolean, default: false },
    cutomer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    employees: { type: [{ type: Schema.Types.ObjectId, ref: 'Employee' }], reqired: true },
    notes: { type: [{ type: Schema.Types.ObjectId, ref: 'Note' }], reqired: true }
}, { timestamps: true });

export default model('job', jobSchema);