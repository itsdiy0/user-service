import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import type { LoginRequest,ErrorResponse } from "../types/auth";
import { useNavigate,useLocation,Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(
    location.state?.message || null
  );
  const [messageType, setMessageType] = useState<"success" | "error">(
    location.state?.type || "error"
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.access_token);
      navigate("/");
    } catch (err) {
      const apiError = err as ErrorResponse;
      setMessage(apiError.detail || "Invalid email or password.");
      setMessageType("error");
    }
  };

  return (
    <>
    {message && <p className={messageType}>{message}</p>}
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email *"
        onChange={handleChange}
        value={form.email}
      />
      <input
        name="password"
        type="password"
        placeholder="Password *"
        onChange={handleChange}
        value={form.password}
      />
      <button type="submit">Login</button>
    </form>
    <p className="authText">don't have an account ? Register <Link to="/register">here</Link> </p>
    </>
  );
};

export default LoginForm;
