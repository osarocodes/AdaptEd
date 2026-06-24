import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    topic: [{ type: String }],
}, { timestamps: true })

module.exports = mongoose.model('Subject', subjectSchema);