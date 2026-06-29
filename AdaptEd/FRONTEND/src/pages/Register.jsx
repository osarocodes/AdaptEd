import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/shared/AuthLayout";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import axios from "axios";

const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

const SUBJECTS = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Further Mathematics",
  "Geography",
  "Economics",
  "Civic Education",
  "Government",
  "Literature in English",
  "Agricultural Science",
  "Computer Studies",
  "Business Studies",
  "Basic Science",
  "Basic Technology",
  "Social Studies",
  "Yoruba",
  "Igbo",
  "Hausa",
];

const SUBJECT_COLORS = [
  { bg: "#EEF2FF", text: "#4338CA", border: "#C7D2FE" },
  { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
  { bg: "#F0F9FF", text: "#0369A1", border: "#BAE6FD" },
  { bg: "#FEFCE8", text: "#A16207", border: "#FEF08A" },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    classLevel: "",
    subjects: [],
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const toggleSubject = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name: form.fullName,
        email: form.email,
        password: form.password,
        classLevel: form.classLevel,
        subjects: form.subjects,
      });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  if (step === 2) {
    return (
      <AuthLayout>
        <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-1">
          Pick your subjects
        </h2>
        <p className="text-sm md:text-base xl:text-lg text-gray-500 mb-8">
          Select all the subjects you study.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subject, i) => {
              const color = SUBJECT_COLORS[i % SUBJECT_COLORS.length];
              const selected = form.subjects.includes(subject);
              return (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer"
                  style={
                    selected
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "#fff",
                          borderColor: "var(--color-primary)",
                        }
                      : {
                          backgroundColor: color.bg,
                          color: color.text,
                          borderColor: color.border,
                        }
                  }
                >
                  {subject}
                </button>
              );
            })}
          </div>

          <Button type="submit" variant="primary">
            Create account
          </Button>
        </form>

        <p className="text-center text-sm md:text-base text-gray-500 mt-5">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="font-semibold text-gray-900 hover:underline cursor-pointer"
          >
            ← Back
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-1">
        Create your account
      </h2>
      <p className="text-sm md:text-base xl:text-lg text-gray-500 mb-8">
        Takes 30 seconds. No exam board vibes.
      </p>

      <form onSubmit={handleNext} className="flex flex-col gap-5">
        <Input
          label="Full name"
          id="fullName"
          type="text"
          placeholder="Amara Okoye"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="amara@school.ng"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm md:text-lg font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-11 text-sm md:text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ "--tw-ring-color": "var(--color-primary)" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-7 0-1.065.44-2.078 1.17-2.95M6.343 6.343A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 7a9.965 9.965 0 01-4.343 4.657M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm md:text-base font-medium text-gray-700">
            Class level
          </span>
          <div className="flex flex-wrap gap-2">
            {CLASS_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, classLevel: level }))
                }
                className="px-4 py-2 rounded-lg text-sm md:text-base xl:text-lg font-medium border transition-colors cursor-pointer"
                style={
                  form.classLevel === level
                    ? {
                        backgroundColor: "var(--color-primary)",
                        color: "#fff",
                        borderColor: "var(--color-primary)",
                      }
                    : {
                        backgroundColor: "#fff",
                        color: "#374151",
                        borderColor: "#D1D5DB",
                      }
                }
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </form>

      <p className="text-center text-sm md:text-base text-gray-500 mt-5">
        Already have one?{" "}
        <Link
          to="/login"
          className="font-semibold text-gray-900 md:text-base hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
