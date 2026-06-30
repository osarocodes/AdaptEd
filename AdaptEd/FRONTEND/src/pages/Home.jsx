import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const SUBJECTS = [
  {
    id: 1,
    name: "Mathematics",
    initial: "M",
    color: "#6366F1",
    score: 38,
    change: null,
    status: "weak",
    note: "Quadratics & Trig need work",
    topics: 5,
  },
  {
    id: 2,
    name: "Physics",
    initial: "P",
    color: "#EF4444",
    score: 47,
    change: -2,
    status: "weak",
    note: "Forces dipped a little",
    topics: 4,
  },
  {
    id: 3,
    name: "English Language",
    initial: "E",
    color: "#F59E0B",
    score: 84,
    change: 7,
    status: "strong",
    note: "Comprehension on point",
    topics: 4,
  },
];

const ALL_SUBJECTS = [
  { id: 1, name: "Mathematics", initial: "M", color: "#6366F1", topics: 5 },
  { id: 2, name: "Physics", initial: "P", color: "#EF4444", topics: 4 },
  { id: 3, name: "English Language", initial: "E", color: "#F59E0B", topics: 4 },
  { id: 4, name: "Chemistry", initial: "C", color: "#10B981", topics: 6 },
  { id: 5, name: "Biology", initial: "B", color: "#3B82F6", topics: 5 },
  { id: 6, name: "Government", initial: "G", color: "#8B5CF6", topics: 3 },
];

function XpBadge() {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-semibold"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
      12
    </div>
  );
}

function SubjectCard({ subject }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/learn")}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: subject.color }}
          >
            {subject.initial}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{subject.name}</p>
            <p className="text-xs text-gray-400">{subject.topics} topics</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{subject.score}</p>
          {subject.change !== null && (
            <p
              className="text-xs font-medium"
              style={{ color: subject.change >= 0 ? "#10B981" : "#EF4444" }}
            >
              {subject.change >= 0 ? "↑" : "↓"}{Math.abs(subject.change)}
            </p>
          )}
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit text-xs font-medium"
        style={
          subject.status === "strong"
            ? { backgroundColor: "#DCFCE7", color: "#15803D" }
            : { backgroundColor: "#FEF3C7", color: "#92400E" }
        }
      >
        {subject.status === "strong" ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {subject.status === "strong" ? "Strong: " : "Weak spot: "}
        {subject.note}
      </div>
    </div>
  );
}

function AllSubjectRow({ subject }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between py-3 px-1 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded-lg px-3 transition-colors"
      onClick={() => navigate("/learn")}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: subject.color }}
        >
          {subject.initial}
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">{subject.name}</p>
          <p className="text-xs text-gray-400">{subject.topics} topics</p>
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState("inProgress");
  const [search, setSearch] = useState("");

  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : {};
  const firstName = (user.fullName || user.name || "Amara").split(" ")[0];

  const filtered =
    tab === "inProgress"
      ? SUBJECTS.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
      : ALL_SUBJECTS.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hi, {firstName}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">Ready to level up?</p>
          </div>
          <XpBadge />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab("inProgress")}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={
              tab === "inProgress"
                ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                : { backgroundColor: "#F3F4F6", color: "#6B7280" }
            }
          >
            In Progress
          </button>
          <button
            onClick={() => setTab("all")}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={
              tab === "all"
                ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                : { backgroundColor: "#F3F4F6", color: "#6B7280" }
            }
          >
            All subjects
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search topics in your subjects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
            style={{ "--tw-ring-color": "var(--color-primary)" }}
          />
        </div>

        {/* Content */}
        {tab === "inProgress" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <SubjectCard key={s.id} subject={s} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 p-2">
            {filtered.map((s) => (
              <AllSubjectRow key={s.id} subject={s} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
