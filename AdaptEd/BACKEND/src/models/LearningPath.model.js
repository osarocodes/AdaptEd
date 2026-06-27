import mongoose, { mongo } from "mongoose";

const learningPathSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    weakAreas: [{ type: String }],
    lessonSummary: { type: String },
    practiceQuestions: [{ type: String }],
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.model('LearningPath', learningPathSchema)