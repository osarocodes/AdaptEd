import Performance from '../models/Performance.model.js';

export const getPerformanceSummary = async (req, res) => {
    const { subject } = req.params;

    try {
        const performances = await Performance.find({ 
            user: req.user._id,
            subject,
        }).sort({ createdAt: -1});

        if (!performances.length) {
            res.status(404).json({ message: "No performance summary available for this subject"});
        }

        const latest = performances[0];

        let improvement = null;
        if (performances.length > 1) {
            const previous = performances[1];
            improvement = latest.score - previous.score;
        }

        res.json({
            subject,
            totalAttempts: performances.length,
            latestScore: latest.score,
            weakAreas: latest.weakAreas,
            strongAreas: latest.strongAreas,
            topicResults: latest.topicResults,
            improvement,
            history: performances.map((p) => ({
                score: p.score,
                weakAreas: p.weakAreas,
                strongAreas: p.strongAreas,
                date: p.createdAt,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getAllPerformance = async (req, res) => {
    try {
        const performances = await Performance.find({ user: req.user._id}).sort({ createdAt: -1});

        if (!performances.length) {
            res.status(404).json({ message: "No performance data found" })
        }

        const subjectMap = {};
        performances.forEach((p) => {
            if (!subjectMap[p.subject]) {
                subjectMap[p.subject] = p
            }
        });

        const summary = Object.entries(subjectMap).map(([subject, p]) => ({
            subject,
            latestScore: p.score,
            weakAreas: p.weakAreas,
            strongAreas: p.strongAreas,
            date: p.createdAt,
        }));

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}