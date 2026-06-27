import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import quizRoutes from './routes/quiz.route.js';
import performanceRoutes from './routes/performance.route.js'
import learningPathRoutes from './routes/learningPath.route.js';
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/learning-path', learningPathRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});