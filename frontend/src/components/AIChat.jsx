import { useState } from "react";
import api from "../api/axios.js";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/chat",
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.answer,
        },
      ]);

      setMessage("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div
      className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
text-white
mb-6
"
    >
      <h2 className="text-2xl font-bold mb-4">🤖 Finance Assistant</h2>

      <div
        className="
h-72
overflow-y-auto
space-y-3
"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className="
inline-block
bg-black/20
p-3
rounded-xl
"
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && <p>Thinking 🤖...</p>}
      </div>

      <form onSubmit={sendMessage} className="flex gap-3 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your money..."
          className="
flex-1
p-3
rounded-xl
bg-black/20
"
        />

        <button
          className="
bg-gradient-to-r
from-cyan-500
to-purple-500
px-5
rounded-xl
font-bold
"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
