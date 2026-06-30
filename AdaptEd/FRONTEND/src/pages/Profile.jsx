import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

export default function Profile() {
  const navigate = useNavigate();

  const raw = localStorage.getItem("user");
  const stored = raw ? JSON.parse(raw) : {};

  const [form, setForm] = useState({
    fullName: stored.fullName || stored.name || "",
    username: stored.username || "",
    email: stored.email || "",
    schoolName: stored.schoolName || "",
    city: stored.city || "",
    classLevel: stored.classLevel || "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ ...stored, ...form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const initials = (form.fullName || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppLayout>
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 text-sm md:text-base mt-0.5">Your account & school</p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {initials}
          </div>
          <button className="text-sm font-medium hover:underline" style={{ color: "var(--color-primary)" }}>
            Change photo
          </button>
          <p className="text-xs text-gray-400 mt-0.5">JPG or PNG, up to 2MB</p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {/* Your details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Your details
            </p>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 px-4">
              {[
                { label: "Full name", id: "fullName", type: "text" },
                { label: "Username", id: "username", type: "text" },
                { label: "Email", id: "email", type: "email" },
              ].map(({ label, id, type }) => (
                <div key={id} className="py-3.5">
                  <label htmlFor={id} className="text-xs text-gray-400 block mb-1">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    value={form[id]}
                    onChange={handleChange}
                    className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* School details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              School details
            </p>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 px-4">
              <div className="py-3.5">
                <label htmlFor="schoolName" className="text-xs text-gray-400 block mb-1">
                  School name
                </label>
                <input
                  id="schoolName"
                  type="text"
                  value={form.schoolName || ""}
                  onChange={handleChange}
                  className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                />
              </div>
              <div className="py-3.5">
                <label htmlFor="city" className="text-xs text-gray-400 block mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={form.city || ""}
                  onChange={handleChange}
                  className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                />
              </div>
              <div className="py-3.5">
                <label className="text-xs text-gray-400 block mb-2">Class</label>
                <div className="flex flex-wrap gap-2">
                  {CLASS_LEVELS.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, classLevel: level }))}
                      className="px-3 py-1 rounded-lg text-xs font-medium border transition-colors"
                      style={
                        form.classLevel === level
                          ? { backgroundColor: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)" }
                          : { backgroundColor: "#F9FAFB", color: "#374151", borderColor: "#E5E7EB" }
                      }
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {saved ? "Saved ✓" : "Save changes"}
          </button>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
