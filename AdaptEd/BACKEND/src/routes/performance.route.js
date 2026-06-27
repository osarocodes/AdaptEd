import express from 'express';
import { getPerformanceSummary, getAllPerformance } from '../controllers/performance.controllers.js';
import { protect } from '../middlewares/auth.middleware.js'
const router = express.Router();

router.get('/:subject', protect ,getPerformanceSummary);
router.get('/', protect ,getAllPerformance);

export default router;