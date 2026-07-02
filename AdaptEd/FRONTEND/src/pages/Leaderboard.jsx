import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import XpBadge from "../components/shared/XpBadge";
import { DATA, PODIUM_MEDALS } from '../utils/mockData'




export default function Leaderboard() {
  const [tab, setTab] = useState("Global");
  const rows = DATA[tab] || [];

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  const podiumOrder = [
    top3.find((r) => r.rank === 2),
    top3.find((r) => r.rank === 1),
    top3.find((r) => r.rank === 3),
  ].filter(Boolean);

  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">See how you stack up</p>
          </div>
          <XpBadge />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["Global", "City", "School"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors"
              style={
                tab === t
                  ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                  : { backgroundColor: "#F3F4F6", color: "#6B7280" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* Podium */}
        {podiumOrder.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
            <div className="flex items-end justify-center gap-4">
              {podiumOrder.map((person) => {
                const medal = PODIUM_MEDALS[person.rank];
                return (
                  <div key={person.rank} className="flex flex-col items-center gap-2">
                    <span className="text-lg">{medal.label}</span>
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm border-2"
                      style={{
                        backgroundColor: person.color,
                        borderColor: medal.border,
                      }}
                    >
                      {person.initials}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 text-center max-w-[72px] leading-tight">
                      {person.name.replace(" (You)", "")}
                    </p>
                    <p className="text-xs text-gray-400">{person.xp.toLocaleString()}</p>
                    <div
                      className={`w-16 ${medal.height} rounded-t-lg`}
                      style={{ backgroundColor: medal.bg, border: `1px solid ${medal.border}` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rest of list */}
        {rest.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
            {rest.map((person) => (
              <div
                key={person.rank}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={person.isMe ? { backgroundColor: "#FFFBEB" } : {}}
              >
                <span className="text-sm font-semibold text-gray-400 w-5 text-center flex-shrink-0">
                  {person.rank}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: person.color }}
                >
                  {person.initials}
                </div>
                <p
                  className="flex-1 text-sm font-medium"
                  style={{ color: person.isMe ? "#92400E" : "#111827" }}
                >
                  {person.name}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  {person.xp.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
