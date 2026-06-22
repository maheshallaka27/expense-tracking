import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await api.post("/auth/signup", form);
      console.log(res.data);
      setMessage("Signup SuccessFull");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup Failed");
    }
  };
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
    p-6
    "
    >
      <div
        className="
      w-full
      max-w-md
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-8
      shadow-2xl
      "
      >
        <h2
          className="
        text-4xl
        font-extrabold
        text-center
        mb-8
        bg-gradient-to-r
        from-cyan-300
        to-purple-400
        bg-clip-text
        text-transparent
        "
        >
          Create account
        </h2>
        {message && (
          <div
            className={`
p-3
rounded-xl
mb-5
text-center
border
${
  message.includes("Successful")
    ? "bg-green-500/20 text-green-300 border-green-400/30"
    : "bg-red-500/20 text-red-300 border-red-400/30"
}
`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="
          w-full
          p-3
          rounded-xl
          bg-black/20
          border
          border-white/20
          text-white
          placeholder-gray-300
          outline-none
          "
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
          w-full
          p-3
          rounded-xl
          bg-black/20
          border
          border-white/20
          text-white
          placeholder-gray-300
          outline-none
          "
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="
    w-full
    p-3
    pr-12
    rounded-xl
    bg-black/20
    border
    border-white/20
    text-white
    placeholder-gray-300
    outline-none
    "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
    absolute
    right-3
    top-3
    text-gray-300
    hover:text-white
    "
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            className="
          w-full
          bg-gradient-to-r
          from-purple-500
          to-pink-500
          p-3
          rounded-xl
          font-bold
          text-white
          hover:scale-[1.02]
          transition
          "
          >
            Submit
          </button>
          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-cyan-300 font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
