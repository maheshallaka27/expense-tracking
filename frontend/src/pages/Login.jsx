import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
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
    try {
      const res = await api.post("/auth/login", form);

      //save token
      localStorage.setItem("token", res.data.token);
      setMessage("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
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
          Welcome Back
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
        <form onSubmit={handleSubmit}>
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
          mb-6
          "
          />
          <div className="relative">
            <input
              type={pass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
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
          mb-15
          "
            />
            <button
              type="button"
              onClick={() => setPass(!pass)}
              className="
    absolute
    right-3
    top-3
    text-gray-300
    hover:text-white
    "
            >
              {pass ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            className="
          w-full
          bg-gradient-to-r
          from-cyan-500
          to-purple-500
          p-3
          rounded-xl
          font-bold
          text-white
          hover:scale-[1.02]
          transition
          mb-6
          "
          >
            Login
          </button>
          <p className="text-center text-gray-300 mt-6">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="
    text-cyan-300
    font-bold
    cursor-pointer
    hover:text-purple-300
    "
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
