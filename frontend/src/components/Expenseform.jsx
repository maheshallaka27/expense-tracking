import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
const Expenseform = ({ fetchExpenses, fetchAnalytics, selectedExpense }) => {
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdit = (expense) => {
    setEditId(expense._id);

    setForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.substring(0, 10),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (editId) {
        await api.put(`/expenses/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Expense updated 💰");
      } else {
        await api.post("/expenses", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Expense added 💰");
      }
      await fetchExpenses();
      await fetchAnalytics();
      setEditId(null);
      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedExpense) {
      setEditId(selectedExpense._id);

      setForm({
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        description: selectedExpense.description,
        date: selectedExpense.date.substring(0, 10),
      });
    }
  }, [selectedExpense]);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
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
          name="category"
          placeholder="Category"
          value={form.category}
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
          name="description"
          placeholder="Description"
          value={form.description}
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
          name="date"
          placeholder="date"
          value={form.date}
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
        <button
          disabled={loading}
          className="
w-full
bg-gradient-to-r
from-purple-500
to-cyan-500
p-3
rounded-xl
font-bold
hover:scale-[1.02]
transition
disabled:opacity-50
disabled:cursor-not-allowed
"
        >
          {loading ? "Saving..." : editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default Expenseform;
