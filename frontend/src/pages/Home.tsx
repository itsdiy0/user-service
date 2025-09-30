import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Home Page 🎉</h1>
      {token && <p>Your token: {token}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
