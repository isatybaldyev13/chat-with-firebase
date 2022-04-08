import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export const Dashboard = () => {
  const { user, logout } = useAuthContext();

  return user ? (
    <div>
      <h1>Dashboard page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <Navigate to={"/signin"} />
  );
};
