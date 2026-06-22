import { jwtDecode } from "jwt-decode";
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};
