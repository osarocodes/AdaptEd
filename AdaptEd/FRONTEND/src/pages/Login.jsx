import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/shared/AuthLayout";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up auth
    console.log("Login:", form);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-1">Welcome back</h2>
      <p className="text-sm md:text-base xl:text-lg text-gray-500 mb-8">Let's keep that streak going.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="amara@school.ng"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="primary">
          Log in
        </Button>
      </form>

      <p className="text-center text-sm md:text-base text-gray-500 mt-5">
        New here?{" "}
        <Link to="/register" className="font-semibold md:text-base text-gray-900 hover:underline">
          Create account
        </Link>
      </p>

    </AuthLayout>
  );
}
