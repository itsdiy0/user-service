import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import type { loginType } from "../types/auth";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState<loginType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.access_token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
