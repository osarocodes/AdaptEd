import AppLayout from "../components/layout/AppLayout";

const SECTIONS = [
  {
    id: 1,
    title: "Quadratic Equations",
    done: 2,
    total: 5,
    items: [
      { id: 1, label: "Solve by factoring", status: "done" },
      { id: 2, label: "The quadratic formula", status: "done" },
      { id: 3, label: "Completing the square", status: "next" },
      { id: 4, label: "Word problems", status: "locked", hint: "Finish the one above" },
      { id: 5, label: "Graphing parabolas", status: "locked", hint: "Finish the one above" },
    ],
  },
  {
    id: 2,
    title: "Trigonometry",
    done: 0,
    total: 4,
    items: [
      { id: 1, label: "Sine & cosine basics", status: "next" },
      { id: 2, label: "The unit circle", status: "locked", hint: "Finish the one above" },
      { id: 3, label: "Trig identities", status: "locked", hint: "Finish the one above" },
      { id: 4, label: "Sine & cosine rules", status: "locked", hint: "Finish the one above" },
    ],
  },
  {
    id: 3,
    title: "Forces & Motion",
    done: 4,
    total: 4,
    items: [
      { id: 1, label: "Newton's laws", status: "done" },
      { id: 2, label: "Friction & normal force", status: "done" },
      { id: 3, label: "Momentum", status: "done" },
      { id: 4, label: "Work & energy", status: "done" },
    ],
  },
];

function StatusIcon({ status }) {
  if (status === "done") {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#DCFCE7" }}>
        <svg className="w-4 h-4" fill="none" stroke="#15803D" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
    );
  }
  if (status === "next") {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A1 1 0 008 6.82z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

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

export default function Exercise() {
  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Exercises</h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">Practice makes progress</p>
          </div>
          <XpBadge />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {SECTIONS.map((section) => {
            const pct = Math.round((section.done / section.total) * 100);
            return (
              <div key={section.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                {/* Section header */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-gray-900">{section.title}</h2>
                  <span className="text-sm text-gray-400">
                    {section.done}/{section.total}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct === 100 ? "#10B981" : "var(--color-primary)",
                    }}
                  />
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 ${item.status === "locked" ? "opacity-50" : "cursor-pointer"}`}
                    >
                      <StatusIcon status={item.status} />
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            item.status === "done" ? "line-through text-gray-400" : "text-gray-800"
                          }`}
                        >
                          {item.label}
                        </p>
                        {item.hint && (
                          <p className="text-xs text-gray-400">{item.hint}</p>
                        )}
                        {item.status === "done" && (
                          <p className="text-xs text-green-600">Completed</p>
                        )}
                        {item.status === "next" && (
                          <p className="text-xs text-gray-400">Tap to start</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
