import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/shared/AuthLayout";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

const CLASS_LEVELS = ["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"];

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", classLevel: "" });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up auth
    console.log("Register:", form);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
      <p className="text-sm text-gray-500 mb-8">Takes 30 seconds. No exam board vibes.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <span className="text-sm font-medium text-gray-700">Class level</span>
          <div className="flex flex-wrap gap-2">
            {CLASS_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, classLevel: level }))}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer"
                style={
                  form.classLevel === level
                    ? { backgroundColor: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)" }
                    : { backgroundColor: "#fff", color: "#374151", borderColor: "#D1D5DB" }
                }
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary">
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have one?{" "}
        <Link to="/login" className="font-semibold text-gray-900 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
