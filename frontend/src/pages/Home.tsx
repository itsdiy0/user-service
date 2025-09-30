import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../api/auth";
import type { User, ErrorResponse } from "../types/auth";

const Home = () => {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (err) {
        const apiError = err as ErrorResponse;
        setError(apiError.detail || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      {user && (
        <div className="user-profile">
          <h2>User Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Full Name:</strong> {user.full_name || "Not provided"}</p>
          <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      )}
      <button className="logout" onClick={logout}>Logout</button>
    </>
  );
};

export default Home;