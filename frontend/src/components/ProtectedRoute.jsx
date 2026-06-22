import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (isTokenExpired()) {
    localStorage.removeItem("token");

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
