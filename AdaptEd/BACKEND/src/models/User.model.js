import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,required: true },
    classLevel: { type: String, required: true },
    subjects: [{ type: String }],
}, { timestamps: true })

export default mongoose.model('User', userSchema);