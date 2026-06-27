import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Quiz from "../models/Quiz.model.js";

dotenv.config();
connectDB();

const quizzes = [
    {
        subject: "Mathematics",
        classLevel: "SS2",
        questions: [
        {
            question: "What is the value of x in 2x + 4 = 10?",
            options: ["2", "3", "4", "5"],
            correctAnswer: "3",
            topic: "Algebra",
            difficulty: "easy",
        },
        {
            question: "Simplify: 3(x + 2) - 2(x - 1)",
            options: ["x + 8", "x - 8", "5x + 8", "x + 4"],
            correctAnswer: "x + 8",
            topic: "Algebra",
            difficulty: "medium",
        },
        {
            question: "Find the area of a circle with radius 7cm (π = 22/7)",
            options: ["144cm²", "154cm²", "164cm²", "174cm²"],
            correctAnswer: "154cm²",
            topic: "Geometry",
            difficulty: "medium",
        },
        {
            question: "What is the sum of angles in a triangle?",
            options: ["90°", "180°", "270°", "360°"],
            correctAnswer: "180°",
            topic: "Geometry",
            difficulty: "easy",
        },
        {
            question: "Solve: x² - 5x + 6 = 0",
            options: ["x=2,x=3", "x=1,x=6", "x=-2,x=-3", "x=2,x=-3"],
            correctAnswer: "x=2,x=3",
            topic: "Quadratic Equations",
            difficulty: "hard",
        },
        ],
    },
    {
        subject: "English",
        classLevel: "SS2",
        questions: [
        {
            question: "Which of the following is a synonym for 'eloquent'?",
            options: ["Quiet", "Articulate", "Confused", "Aggressive"],
            correctAnswer: "Articulate",
            topic: "Vocabulary",
            difficulty: "medium",
        },
        {
            question: "Identify the figure of speech: 'The wind whispered through the trees'",
            options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
            correctAnswer: "Personification",
            topic: "Figures of Speech",
            difficulty: "easy",
        },
        {
            question: "Which sentence is grammatically correct?",
            options: [
            "She don't like apples",
            "She doesn't likes apples",
            "She doesn't like apples",
            "She not like apples",
            ],
            correctAnswer: "She doesn't like apples",
            topic: "Grammar",
            difficulty: "easy",
        },
        {
            question: "What is the plural of 'phenomenon'?",
            options: ["Phenomenons", "Phenomenas", "Phenomena", "Phenomenes"],
            correctAnswer: "Phenomena",
            topic: "Vocabulary",
            difficulty: "medium",
        },
        {
            question: "Which of these is a compound sentence?",
            options: [
            "She ran fast",
            "She ran fast because she was late",
            "She ran fast and she won the race",
            "Running fast, she won",
            ],
            correctAnswer: "She ran fast and she won the race",
            topic: "Grammar",
            difficulty: "hard",
        },
        ],
    },
    {
        subject: "Physics",
        classLevel: "SS2",
        questions: [
        {
            question: "What is the SI unit of force?",
            options: ["Watt", "Joule", "Newton", "Pascal"],
            correctAnswer: "Newton",
            topic: "Forces",
            difficulty: "easy",
        },
        {
            question: "A car travels 100km in 2 hours. What is its average speed?",
            options: ["25km/h", "50km/h", "75km/h", "200km/h"],
            correctAnswer: "50km/h",
            topic: "Motion",
            difficulty: "easy",
        },
        {
            question: "Which of the following is not a vector quantity?",
            options: ["Velocity", "Acceleration", "Speed", "Force"],
            correctAnswer: "Speed",
            topic: "Motion",
            difficulty: "medium",
        },
        {
            question: "What does E=mc² represent?",
            options: [
            "Energy equals mass times the speed of light",
            "Energy equals mass times the speed of light squared",
            "Energy equals momentum times the speed of light",
            "Energy equals mass times acceleration",
            ],
            correctAnswer: "Energy equals mass times the speed of light squared",
            topic: "Modern Physics",
            difficulty: "medium",
        },
        {
            question: "What is the acceleration due to gravity on Earth?",
            options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"],
            correctAnswer: "9.8 m/s²",
            topic: "Forces",
            difficulty: "easy",
        },
        ],
    },
];

const seedData = async () => {
    try {
        await Quiz.deleteMany();
        await Quiz.insertMany(quizzes);
        console.log("Quiz data seeded successfully");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();