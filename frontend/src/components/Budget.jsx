import { useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const Budget = ({ analytics }) => {
  const [budget, setBudget] = useState(0);
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudget(res.data.amount);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetBudget = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/budget",
        {
          amount,
          month,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Budget updated 💰");
      fetchBudget();
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const spent = analytics?.monthlyExpense?.[currentMonth] || 0;

  const percentage = Math.min((spent / budget) * 100, 100);
  const warning =
    percentage >= 100
      ? "🚨 Budget exceeded!"
      : percentage >= 80
        ? "⚠️ You are close to your budget limit"
        : "";
  return (
    <div
      className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-xl
text-white
"
    >
      <h2
        className="
text-2xl
font-bold
mb-5
"
      >
        Monthly Budget 💰
      </h2>

      <form onSubmit={handleSetBudget} className="flex gap-3">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget"
          className="
flex-1
p-3
rounded-xl
bg-black/20
border
border-white/20
outline-none
"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="
p-3
rounded-xl
bg-black/20
border
border-white/20
"
        >
          <option value="">Select month</option>

          <option>Jan</option>
          <option>Feb</option>
          <option>Mar</option>
          <option>Apr</option>
          <option>May</option>
          <option>Jun</option>
          <option>Jul</option>
          <option>Aug</option>
          <option>Sep</option>
          <option>Oct</option>
          <option>Nov</option>
          <option>Dec</option>
        </select>

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
          Set
        </button>
      </form>

      <div className="mt-6">
        <div className="flex justify-between">
          <p>Spent</p>

          <p>₹{spent}</p>
        </div>

        <div
          className="
w-full
h-3
bg-white/20
rounded-full
mt-3
"
        >
          <div
            style={{
              width: `${percentage}%`,
            }}
            className="
h-3
bg-gradient-to-r
from-cyan-400
to-purple-500
rounded-full
"
          />
        </div>

        <p className="mt-3 text-gray-300">
          Remaining: ₹{budget > 0 ? budget - spent : 0}
        </p>
        {warning && (
          <p
            className="
  mt-4
  text-yellow-300
  font-bold
  "
          >
            {warning}
          </p>
        )}
      </div>
    </div>
  );
};

export default Budget;
