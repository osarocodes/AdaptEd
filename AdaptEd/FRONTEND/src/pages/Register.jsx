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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
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
      await axios.post("http://localhost:3000/api/auth/register", {
        fullName: form.fullName,
        email: form.email,
        classLevel: form.classLevel,
        subjects: form.subjects,
      });
      navigate("/login");
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
