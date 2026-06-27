import Quiz from "../models/Quiz.model.js";
import Performance from "../models/Performance.model.js";

export const getQuiz = async (req, res) => {
    const { subject } = req.params;
    const { classLevel } = req.user;

    try {
        const quiz = await Quiz.findOne({ subject, classLevel });

        if (!quiz) {
            return res.status(404).json({ message: "No quiz found for this subject and class level" })
        }
        const satinizedQuestions = quiz.questions.map((q) => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            topic: q.topic,
            difficulty: q.difficulty
        }));

        res.json({ subject: quiz.subject, questions: satinizedQuestions });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const submitQuiz = async (req, res) => {
    const { subject } = req.params;
    const { answers } = req.body;
    const { classLevel } = req.user;

    try {
        const quiz = await Quiz.findOne({ subject, classLevel });

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found"})
        }

        let score = 0;
        const topicMap = {};

        quiz.questions.forEach((q) => {
            const userAnswer = answers.find(
                (a) => a.questionId === q._id.toString()
            );

            if (!topicMap[q.topic]) {
                topicMap[q.topic] = { correct: 0, total: 0}
            }

            topicMap[q.topic].total += 1;

            if (userAnswer && userAnswer.answer === q.correctAnswer) {
                score += 1;
                topicMap[q.topic].correct += 1;
            }
        });

        const topicResults = Object.entries(topicMap).map(([topic, data]) => ({
            topic,
            correct: data.correct,
            total: data.total,
        }));
        console.log(topicResults)

        const weakAreas = topicResults
            .filter((t) => t.correct / t.total < 0.5)
            .map((t) => t.topic);

        const strongAreas = topicResults
            .filter((t) => t.correct / t.total >= 0.5)
            .map((t) => t.topic)

        const performance = await Performance.create({
            user: req.user._id,
            subject,
            score,
            topicResults,
            strongAreas,
            weakAreas,
        });

        res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            total: quiz.questions.length,
            topicResults,
            weakAreas,
            strongAreas,
            performanceId: performance._id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}