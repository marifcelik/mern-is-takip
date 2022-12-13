import { Schema, model } from "mongoose";

const jobSchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    cutomer: { type: Schema.Types.ObjectId, ref: 'Customer', },
    employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
}, { timestamps: true });

export default model('job', jobSchema);