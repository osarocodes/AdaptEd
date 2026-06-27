import express from 'express';
import { getQuiz, submitQuiz } from '../controllers/quiz.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/:subject', protect, getQuiz);
router.post('/:subject/submit', protect, submitQuiz);

export default router;