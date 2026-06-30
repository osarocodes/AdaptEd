import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import XpBadge from "../components/shared/XpBadge";

const STUDY_DATA = {
  "1 Day": [{ label: "Now", value: 42 }],
  "7 Days": [
    { label: "M", value: 56 },
    { label: "T", value: 30 },
    { label: "W", value: 75 },
    { label: "T", value: 90 },
    { label: "F", value: 42 },
    { label: "S", value: 80 },
    { label: "S", value: 38 },
  ],
  "1 Month": [
    { label: "W1", value: 60 },
    { label: "W2", value: 45 },
    { label: "W3", value: 80 },
    { label: "W4", value: 70 },
  ],
};

const WEAK_AREAS = [
  { subject: "Quadratics", topic: "Math", delta: "+11% this week", positive: true },
  { subject: "Trigonometry", topic: "Math", delta: "+4% this week", positive: true },
  { subject: "Forces", topic: "Physics", delta: "-3% this week", positive: false },
];

const BADGES = [
  { id: 1, label: "Consistent Bird", emoji: "🐦", earned: true },
  { id: 2, label: "Early Bird", emoji: "⏰", earned: true },
  { id: 3, label: "Blaze Hustler", emoji: "🔥", earned: false },
  { id: 4, label: "Tactician", emoji: "♟️", earned: false },
  { id: 5, label: "Quiz Master", emoji: "🏆", earned: false },
  { id: 6, label: "Streak King", emoji: "⚡", earned: false },
];


function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d, i) => {
        const heightPct = (d.value / max) * 100;
        const isHighest = d.value === Math.max(...data.map((x) => x.value));
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full flex items-end" style={{ height: "96px" }}>
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isHighest ? "var(--color-accent)" : "var(--color-primary)",
                  minHeight: "4px",
                }}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Progress() {
  const [chartRange, setChartRange] = useState("7 Days");

  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */} 
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your progress</h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">You're on a roll!</p>
          </div>
          <XpBadge />
        </div>

        {/* Level card */}
        <div
          className="rounded-2xl p-5 mb-5 text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              ⭐
            </div>
            <div>
              <p className="font-bold text-lg">Level 7 - Rising Star</p>
              <p className="text-blue-200 text-sm">640 / 1000 XP to Level 8</p>
            </div>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "64%", backgroundColor: "var(--color-accent)" }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { value: "42", label: "Lessons done" },
            { value: "78%", label: "Avg accuracy", sub: "↑6" },
            { value: "9", label: "Topics mastered" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-4 text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.sub && (
                  <span className="text-xs font-semibold text-green-500">{stat.sub}</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Study activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Study activity</h2>
            <div className="flex gap-1">
              {["1 Day", "7 Days", "1 Month"].map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={
                    chartRange === r
                      ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                      : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={STUDY_DATA[chartRange]} />
        </div>

        {/* Weak areas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <h2 className="font-semibold text-gray-900 mb-1">Weak areas</h2>
          <p className="text-xs text-gray-400 mb-4">We're tracking these — and they're moving.</p>
          <div className="flex flex-col gap-3">
            {WEAK_AREAS.map((area) => (
              <div key={area.subject} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{area.subject}</p>
                  <p className="text-xs text-gray-400">{area.topic}</p>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: area.positive ? "#10B981" : "#EF4444" }}
                >
                  {area.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Badges</h2>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-opacity ${
                  badge.earned ? "border-gray-100" : "border-gray-100 opacity-40"
                }`}
                style={badge.earned ? { backgroundColor: "#FFFBEB" } : { backgroundColor: "#F9FAFB" }}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className="text-xs text-center font-medium text-gray-700 leading-tight">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
