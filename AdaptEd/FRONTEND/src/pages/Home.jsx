import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import XpBadge from "../components/shared/XpBadge";
import SubjectAvatar from "../components/shared/SubjectAvatar";
import { useAuthStore } from "../stores/useAuthStore";
import { ALL_SUBJECTS, SUBJECTS } from "../utils/mockData";
import { Loader } from 'lucide-react';


function SubjectCard({ subject }) {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])
  
  if (!authUser) {
    <Loader className="border border-amber-300" />
  }

  return (
    <div
      className="bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/learn")}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <SubjectAvatar initial={subject.initial} color={subject.color} />
          <div>
            {authUser && (<p className="font-semibold text-gray-900 text-sm">{authUser.fullName}</p>)}
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
        <SubjectAvatar initial={subject.initial} color={subject.color} size="sm" />
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
