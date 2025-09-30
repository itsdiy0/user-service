import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import type { loginType } from "../types/auth";
import { useNavigate,useLocation } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState<loginType>({
    email: "",
    password: "",
  });
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(
    location.state?.message || null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.access_token);
      navigate("/");
    } catch (err) {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <>
    {message && <p style={{ color: "red" }}>{message}</p>}
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
    </>
  );
};

export default LoginForm;
