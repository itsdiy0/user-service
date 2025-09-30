import { useState } from "react";
import { registerUser } from "../api/auth";
import type { RegisterRequest,ErrorResponse } from "../types/auth";
import { useNavigate,Link } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState<RegisterRequest>({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      await registerUser(form);
      navigate("/login",{
        state: { message: "Registration successful! Please log in." }
      });
    } catch (err) {
      const apiError = err as ErrorResponse;
      setError(apiError.detail || "Registration failed. Try again.");
    }
  };

  return (
    <>
    {error && <p className="error">{error}</p>}
    
    <form onSubmit={handleSubmit}>
    <input
        name="email"
        placeholder="Email *"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="username"
        placeholder="Username *"
        onChange={handleChange}
        value={form.username}
        required
      />
    <input
        name="full_name"
        placeholder="full name"
        onChange={handleChange}
        value={form.full_name}
      />
      <input
        name="password"
        type="password"
        placeholder="Password *"
        onChange={handleChange}
        value={form.password}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password *"
        onChange={handleConfirmChange}
        value={confirmPassword}
        required
      />
      <button type="submit">Register</button>
    </form>
    <p className="authText">Already have an account ? Login <Link to="/login">here</Link></p>
    </>
  );
};

export default RegisterForm;
