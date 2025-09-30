import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <button className="logout" onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
