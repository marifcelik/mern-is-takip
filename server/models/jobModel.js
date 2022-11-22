import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: String,
    detail: String
});

export default mongoose.model('job', jobSchema);