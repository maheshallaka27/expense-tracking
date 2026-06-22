import React, { useEffect, useState } from "react";
import api from "../api/axios.js";

const Insights = ({ refresh }) => {
  const [insigths, setInsights] = useState([]);
  const [budget, setBudget] = useState(0);
  const getBudget = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/budget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBudget(res.data.amount);
  };
  const getInsigths = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/expenses/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      let messages = [];
      const month = new Date().toLocaleString("default", {
        month: "long",
      });

      messages.push(`📊 You spent ₹${data.totalExpense} this month`);

      messages.push(`🧾 You made ${data.count} transactions`);

      messages.push(
        `💳 Average transaction: ₹${Math.round(data.averageExpense)}`,
      );
      // category

      const categories = data.categoryExpense;

      let highest = "";
      let max = 0;
      Object.keys(categories).forEach((cat) => {
        if (categories[cat] > max) {
          max = categories[cat];
          highest = cat;
        }
      });
      if (highest) {
        messages.push(`🔥 Highest spending: ${highest} (₹${max})`);
      }
      if (budget) {
        const used = (data.totalExpense / budget) * 100;

        if (used >= 80) {
          messages.push(`⚠️ You have used ${Math.round(used)}% of your budget`);
        }
      }
      setInsights(messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInsigths();
    getBudget();
  }, [refresh]);
  return (
    <div
      className="
      w-full
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    rounded-3xl
    p-6
    shadow-xl
    text-white
    h-full
    "
    >
      <h2
        className="
      text-3xl
      font-extrabold
      mb-6
      flex
      items-center
      gap-3
      "
      >
        💡 Insights
      </h2>

      <div className="space-y-4">
        {insigths.map((item, index) => (
          <div
            key={index}
            className="
        bg-black/20
        border
        border-white/10
        rounded-2xl
        p-4
        hover:scale-[1.02]
        transition
        "
          >
            <p
              className="
          text-gray-200
          text-lg
          "
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
