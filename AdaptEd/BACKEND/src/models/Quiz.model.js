import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'], default: 'medium'},
});

const quizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    classLevel: { type: String, required: true },
    questions: [questionSchema],
}, { timestamps: true })

export default mongoose.model('Quiz', quizSchema);