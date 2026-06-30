import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import XpBadge from "../components/shared/XpBadge";
import SubjectAvatar from "../components/shared/SubjectAvatar";

const SUBJECTS = [
  { id: 1, name: "Mathematics", initial: "M", color: "#6366F1", topics: 5 },
  { id: 2, name: "English Language", initial: "E", color: "#F59E0B", topics: 4 },
  { id: 3, name: "Physics", initial: "P", color: "#EF4444", topics: 4 },
  { id: 4, name: "Chemistry", initial: "C", color: "#10B981", topics: 6 },
  { id: 5, name: "Biology", initial: "B", color: "#3B82F6", topics: 5 },
  { id: 6, name: "Government", initial: "G", color: "#8B5CF6", topics: 3 },
  { id: 7, name: "Economics", initial: "E", color: "#F97316", topics: 4 },
  { id: 8, name: "Geography", initial: "G", color: "#14B8A6", topics: 5 },
];

const SUBJECT_TOPICS = {
  1: [
    { id: 1, name: "Quadratic Equations", subtopics: 5 },
    { id: 2, name: "Trigonometry", subtopics: 4 },
    { id: 3, name: "Statistics", subtopics: 3 },
    { id: 4, name: "Algebra", subtopics: 6 },
    { id: 5, name: "Forces & Motion", subtopics: 4 },
  ],
  2: [
    { id: 1, name: "Comprehension", subtopics: 4 },
    { id: 2, name: "Essay Writing", subtopics: 3 },
    { id: 3, name: "Summary & Précis", subtopics: 3 },
    { id: 4, name: "Lexis & Structure", subtopics: 5 },
  ],
  3: [
    { id: 1, name: "Forces & Motion", subtopics: 5 },
    { id: 2, name: "Electricity", subtopics: 4 },
    { id: 3, name: "Waves", subtopics: 3 },
    { id: 4, name: "Optics", subtopics: 4 },
  ],
};

function TopicRow({ topic }) {
  return (
    <div className="flex items-center justify-between py-3.5 px-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-xl">
      <div>
        <p className="font-medium text-gray-900 text-sm">{topic.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{topic.subtopics} subtopics</p>
      </div>
      <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}

export default function Learn() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    const topics = SUBJECT_TOPICS[selected.id] || [];
    return (
      <AppLayout>
        <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>
              <div className="flex items-center gap-3">
                <SubjectAvatar initial={selected.initial} color={selected.color} />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{selected.name}</h1>
                  <p className="text-gray-500 text-sm mt-0.5">Pick a topic to study</p>
                </div>
              </div>
            </div>
            <XpBadge />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 p-2">
            {topics.map((t) => (
              <TopicRow key={t.id} topic={t} />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Learn</h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">Pick something to master</p>
          </div>
          <XpBadge />
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
            placeholder="Search any subject or topic"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
            style={{ "--tw-ring-color": "var(--color-primary)" }}
          />
        </div>

        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
          All subjects · tap to start learning
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {filtered.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelected(subject)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors text-left first:rounded-t-2xl last:rounded-b-2xl"
            >
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
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
