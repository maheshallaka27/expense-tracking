import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";
const Profile = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div
        className="
      min-h-screen
      bg-gradient-to-br
      from-slate-900
      via-purple-900
      to-slate-900
      flex
      items-center
      justify-center
      text-white
      text-2xl
      "
      >
        Loading Profile.....
      </div>
    );
  }
  return (
    <div
      className="
    min-h-screen
    bg-gradient-to-br
    from-slate-900
    via-purple-900
    to-slate-900
    p-6
    "
    >
      <Navbar />

      <h1
        className="
      text-5xl
      font-extrabold
      text-center
      bg-gradient-to-r
      from-cyan-300
      via-purple-300
      to-pink-400
      bg-clip-text
      text-transparent
      mb-10
      "
      >
        Profile 👤
      </h1>

      <div
        className="
      max-w-6xl
      mx-auto
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-6
      "
      >
        {/* Profile Card */}

        <div
          className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-8
        shadow-xl
        text-white
        "
        >
          <div
            className="
          w-28
          h-28
          mx-auto
          rounded-full
          bg-purple-500/30
          flex
          items-center
          justify-center
          text-6xl
          mb-5
          "
          >
            👤
          </div>

          <h2
            className="
        text-3xl
        font-bold
        text-center
        "
          >
            {profile.user.name}
          </h2>

          <p
            className="
        text-center
        text-gray-300
        mt-3
        "
          >
            {profile.user.email}
          </p>

          <hr className="my-6 border-white/20" />

          <p className="text-gray-300">📅 Member Since</p>

          <p className="font-bold text-lg">
            {new Date(profile.user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Stats */}

        <div
          className="
        lg:col-span-2
        grid
        md:grid-cols-2
        gap-6
        "
        >
          <div
            className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      text-white
      shadow-xl
      "
          >
            <h3>Total Expenses</h3>

            <p
              className="
        text-4xl
        font-bold
        text-cyan-300
        mt-3
        "
            >
              {profile.totalExpenses}
            </p>
          </div>

          <div
            className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      text-white
      shadow-xl
      "
          >
            <h3>Total Spent</h3>

            <p
              className="
        text-4xl
        font-bold
        text-green-300
        mt-3
        "
            >
              ₹{profile.totalSpent}
            </p>
          </div>

          <div
            className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      text-white
      shadow-xl
      "
          >
            <h3>Average Expense</h3>

            <p
              className="
        text-4xl
        font-bold
        text-orange-300
        mt-3
        "
            >
              ₹{Math.round(profile.totalSpent / profile.totalExpenses)}
            </p>
          </div>

          <div
            className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      text-white
      shadow-xl
      "
          >
            <h3>Status</h3>

            <p
              className="
        text-3xl
        font-bold
        text-purple-300
        mt-3
        "
            >
              Active 🔥
            </p>
          </div>
          <button
            onClick={async () => {
              const token = localStorage.getItem("token");

              const res = await api.get("/report", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
              });

              const url = window.URL.createObjectURL(new Blob([res.data]));

              const link = document.createElement("a");

              link.href = url;

              link.download = "expense-report.pdf";

              link.click();
            }}
            className="
bg-gradient-to-r
from-cyan-500
to-purple-500
px-5
py-3
rounded-xl
font-bold
text-white
"
          >
            📄 Generate Report
          </button>
        </div>
      </div>
      <div
        className="
max-w-6xl
mx-auto
mt-6
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-xl
text-white
flex
items-center
justify-between
"
      >
        <div>
          <h3
            className="
text-2xl
font-bold
"
          >
            Keep Tracking! ✨
          </h3>

          <p
            className="
text-gray-300
mt-2
"
          >
            You're doing great! Keep tracking your expenses to build better
            financial habits.
          </p>
        </div>

        <div
          className="
text-6xl
"
        >
          📈
        </div>
      </div>
    </div>
  );
};

export default Profile;
