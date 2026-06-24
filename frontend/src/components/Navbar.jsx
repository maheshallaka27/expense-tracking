import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart3, User, LogOut } from "lucide-react";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav
      className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-2xl
      px-6
      py-4
      mb-8
      shadow-xl
      flex
      justify-between
      items-center
      text-white
      "
    >
      <h2
        className="
        text-2xl
        font-extrabold
        bg-gradient-to-r
        from-cyan-300
        to-purple-400
        bg-clip-text
        text-transparent
        "
      >
        Expense Tracker
      </h2>
      <Link
        to="/dashboard"
        className="
    flex
items-center
gap-2
 hover:text-cyan-300
text-white
    "
      >
        <LayoutDashboard size={20} />
        Dashboard
      </Link>
      <Link
        to="/analytics"
        className="
    flex
items-center
gap-2
 hover:text-cyan-300
text-white
    "
      >
        <BarChart3 size={20} />
        Analytics
      </Link>
      <Link
        to="/profile"
        className="
    flex
items-center
gap-2
 hover:text-cyan-300
text-white
    "
      >
        <User size={20} />
        Profile
      </Link>
      <button
        onClick={logout}
        className="
        bg-rose-500
        hover:bg-rose-600
        px-5
        py-2
        flex
        items-center
        rounded-xl
        font-semibold
        transition
        "
      >
        <LogOut size={20} />
        Logout
      </button>
    </nav>
  );
}
export default Navbar;
