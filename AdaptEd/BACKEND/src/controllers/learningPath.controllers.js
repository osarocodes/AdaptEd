import Groq from 'groq-sdk';
import Performance from '../models/Performance.model.js'
import LearningPath from '../models/LearningPath.model.js'
import { raw } from 'express';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateLearningPath = async (req, res) => {
    const { subject } = req.params;

    try {
        const performance = await Performance.findOne({
            user: req.user._id,
            subject,
        }).sort({ createdAt: -1})

        if (!performance) {
            return res.status(404).json({ message: "No performance data found, Take a quiz first." });
        }

        if (!performance.weakAreas.length) {
            return res.json({
                message: "No weak areas detected. You are doing great in this subject!",
                weakAreas: [],
                lessonSummary: null,
                practiceQuestions: []
            });
        }

        const weakAreasList = performance.weakAreas.join(',');

        const prompt = `You are an expert Nigerian secondary school teacher helping an SS2 student improve in ${subject}. 
        The student recently took a quiz and struggled with these topics: ${weakAreasList}.
        Your task:
        1. Write a clear, encouraging lesson summary (maximum 150 words) that explains these weak topics in simple terms a Nigerian secondary school student would understand.
        2. Generate exactly 3 practice questions (with 4 options each and the correct answer) focused on these weak topics.

        Respond ONLY in this JSON format with no extra text or markdown:
        {
            "lessonSummary": "your lesson summary here",
            "practiceQuestions": [
            {
                "question": "question text",
                "options": ["A", "B", "C", "D"],
                "correctAnswer": "correct option here",
                "topic": "topic name"
            }
        ]
        }`;

        const completion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const rawResponse = completion.choices[0].message.content;

        let parsed;
        try {
            const clean = rawResponse.replace(/```json|```/g, "").trim();
            parsed = JSON.parse(clean)
        } catch (err) {
            return res.status(500).json({ message: "AI response could not be parsed. Try again." })
        }

        const learningPath = await LearningPath.findOneAndUpdate(
            { user: req.user._id, subject },
            {
                weakAreas: performance.weakAreas,
                lessonSummary: parsed.lessonSummary,
                practiceQuestions: parsed.practiceQuestions.map((q) => JSON.stringify(q)),
                lastUpdated: Date.now(),
            },
            { upsert: true, new: true }
        );

        res.json({
            subject,
            weakAreas: performance.weakAreas,
            lessonSummary: parsed.lessonSummary,
            practiceQuestions: parsed.practiceQuestions,
            lastUpdated: learningPath.lastUpdated,
        });
    } catch( error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const getLearningPath = async (req, res) => {
    const { subject } = req.params;

    try {
        const learningPath = await LearningPath({ 
            user: req.user._id,
            subject 
        });

        if (!learningPath) {
            return res.status(404).json({
                message: "No learning path found. Generate one first."
            })
        }

        res.json({
            subject,
            weakAreas: learningPath.weakAreas,
            lessonSummary: learningPath.lessonSummary,
            practiceQuestions: learningPath.practiceQuestions.map((q) => JSON.parse(q)),
            lastUpdated: learningPath.lastUpdated,
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}