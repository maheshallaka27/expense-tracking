import { useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const CategoryBudget = () => {
  const [budgets, setBudgets] = useState([]);

  const [form, setForm] = useState({
    category: "",
    amount: "",
  });

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/category-budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const saveBudget = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/category-budget", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category budget saved 💰");

      setForm({
        category: "",
        amount: "",
      });

      fetchBudgets();
    } catch (err) {
      toast.error("Failed");
    }
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
      <h2
        className="
text-2xl
font-bold
mb-5
"
      >
        🎯 Category Budgets
      </h2>

      <form onSubmit={saveBudget} className="space-y-3">
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
bg-black/20
border
border-white/20
"
        />

        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
bg-black/20
border
border-white/20
"
        />

        <button
          className="
w-full
bg-gradient-to-r
from-cyan-500
to-purple-500
p-3
rounded-xl
font-bold
"
        >
          Save Budget
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {budgets.map((b) => (
          <div
            key={b._id}
            className="
bg-black/20
rounded-xl
p-4
"
          >
            <p className="font-bold">{b.category}</p>

            <div className="mt-3">
              <p>
                ₹{b.spent} / ₹{b.limit}
              </p>

              <div
                className="
h-3
bg-black/30
rounded-full
overflow-hidden
"
              >
                <div
                  className={`
h-full
rounded-full
${
  b.percentage >= 90
    ? "bg-red-400"
    : b.percentage >= 70
      ? "bg-yellow-400"
      : "bg-green-400"
}
`}
                  style={{
                    width: `${Math.min(b.percentage, 100)}%`,
                  }}
                />
              </div>

              <p className="text-sm mt-2">
                {b.percentage >= 90 ? "⚠️ Almost reached" : "✅ Healthy"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBudget;
