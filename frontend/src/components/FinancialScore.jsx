import { useEffect, useState } from "react";
import api from "../api/axios.js";

const FinancialScore = () => {
  const [data, setData] = useState(null);

  const fetchScore = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/ai/financial-score", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log("STATUS:", error.response?.status);

      console.log("MESSAGE:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);
  if (!data || !data.score) {
    return <div className="text-white">Loading financial score...</div>;
  }

  const getColor = () => {
    if (data.score >= 80) return "text-green-400";

    if (data.score >= 60) return "text-yellow-400";

    return "text-red-400";
  };

  const getBg = () => {
    if (data.score >= 80) return "from-green-500/20 to-emerald-500/20";

    if (data.score >= 60) return "from-yellow-500/20 to-orange-500/20";

    return "from-red-500/20 to-pink-500/20";
  };

  const getEmoji = () => {
    if (data.score >= 80) return "🟢";

    if (data.score >= 60) return "🟡";

    return "🔴";
  };

  return (
    <div
      className={`
      bg-gradient-to-br
      ${getBg()}
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      text-white
      shadow-xl
      `}
    >
      <h2
        className="
        text-2xl
        font-bold
        flex
        items-center
        gap-2
        "
      >
        💰 Financial Health
      </h2>

      <div
        className={`
        text-6xl
        font-extrabold
        my-6
        ${getColor()}
        `}
      >
        {data.score}

        <span className="text-2xl text-white">/100</span>
      </div>

      <p className="text-xl font-bold">
        {getEmoji()} {data.status}
      </p>

      <div
        className="
        mt-5
        space-y-3
        text-gray-200
        "
      >
        <p>📅 This month</p>

        <p>💸 Spent: ₹{data.totalSpent}</p>

        <p>🧾 Transactions: {data.transactions}</p>
      </div>

      <div
        className="
        mt-5
        bg-black/20
        rounded-xl
        p-3
        text-sm
        "
      >
        {data.score >= 80 &&
          "Great financial control. Keep maintaining this habit 🚀"}

        {data.score >= 60 &&
          data.score < 80 &&
          "You are doing okay. Try saving a little more this month 💡"}

        {data.score < 60 && "Your spending is high. Review your budget ⚠️"}
      </div>
    </div>
  );
};

export default FinancialScore;
