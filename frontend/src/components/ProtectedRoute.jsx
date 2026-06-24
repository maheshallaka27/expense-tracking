import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth.js";

const ProtectedRoute = ({ children }) => {
  if (isTokenExpired()) {
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
