import { useState } from "react";
import { registerUser } from "../api/auth";
import type { registerType } from "../types/auth";

const RegisterForm = () => {
  const [form, setForm] = useState<registerType>({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration successful! Please log in.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
        required
      />
    <input
        name="full name"
        placeholder="Username"
        onChange={handleChange}
        value={form.full_name}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
