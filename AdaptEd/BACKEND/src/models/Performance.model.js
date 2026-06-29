import mongoose from "mongoose";

const topicResultSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    correct: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

const performanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    topicResults: [topicResultSchema],
    weakAreas: [{ type: String }],
    strongAreas: [{ type: String }]
}, { timestamps: true })

export default mongoose.model('Performance', performanceSchema)