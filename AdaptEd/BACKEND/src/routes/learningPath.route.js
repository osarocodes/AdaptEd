import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { generateLearningPath, getLearningPath } from '../controllers/learningPath.controllers.js'

const router = express.Router();

router.post('/:subject', protect, generateLearningPath);
router.get("/:subject", protect, getLearningPath);

export default router;