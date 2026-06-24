# AdaptED — AI-Powered Personalized Learning Platform

AdaptED tackles the academic struggle faced by Nigerian secondary school students in large, under-resourced classrooms. By analyzing quiz performance, the platform pinpoints individual strengths and weaknesses per subject and delivers AI-generated lesson plans and adaptive exercises — giving every student access to the kind of personalized support that was previously only available through private tutoring.

---

## The Problem

Nigerian secondary school students face a significant academic challenge — large class sizes make it nearly impossible for teachers to identify and address individual learning gaps. Students who cannot afford private tutoring are left behind, with no way to know what they don't know or how to fix it.

## The Solution

AdaptED assesses each student through subject-based quizzes, identifies their weak and strong areas per topic, and uses AI to dynamically generate personalized lesson summaries, revision materials, and adaptive follow-up exercises. Every student gets a learning path built specifically for them.

---

## Features

- 🔐 Secure authentication (register and login with JWT)
- 📚 Subject and class level onboarding
- 📝 Adaptive quizzes per subject
- 📊 Performance analysis — weak and strong area detection
- 🤖 AI-generated personalized lesson plans and practice questions
- 🔄 Adaptive follow-up quizzes weighted toward weak areas
- 📈 Progress tracking across multiple attempts

---

## Tech Stack

**Frontend**
- React.js
- Recharts (progress visualization)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose

**AI**
- Groq API

**Other**
- JWT (authentication)
- Cloudinary (file uploads)
- Multer (file handling)

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Groq API key

### Installation

**Clone the repository**
```bash
git clone https://github.com/osarocodes/AdaptEd.git
cd AdaptEd
```

**Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

Run the backend:
```bash
npm run dev
```

**Frontend setup**
```bash
cd ../frontend
npm install
npm run dev
```

---

## Project Structure

```
AdaptED/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Quiz.js
│   │   ├── Performance.js
│   │   └── LearningPath.js
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
├── frontend/
└── README.md
```

---

## Team

- **Osaro** — Full-stack Developer
- **Flourish** — Full-stack Developer

---

## Built For

This project was built as part of a hackathon focused on solving real problems for Nigerian students through technology.

---

## License

MIT
