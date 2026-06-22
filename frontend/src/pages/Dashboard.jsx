import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Expenseform from "../components/Expenseform";
import Navbar from "../components/Navbar.jsx";
import Insights from "../components/Insights.jsx";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { motion } from "framer-motion";
import Budget from "../components/Budget.jsx";
import BudgetHistory from "../components/BudgetHistory.jsx";
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const editExpense = (expense) => {
    setSelectedExpense(expense);
  };
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Expense deleted 💰");
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/expenses/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpenses();
    fetchAnalytics();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchSearch =
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      expense.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || expense.category === filter;
    return matchSearch && matchFilter;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <Navbar />
      <h1
        className="
  text-5xl
  font-extrabold
  mb-8
  bg-gradient-to-r
  from-cyan-300
  via-purple-300
  to-pink-400
  bg-clip-text
  text-transparent
  "
      >
        Expense Analytics Dashboard
      </h1>
      <p
        className="
  text-gray-200
  text-xl
  font-light
  mb-8
  tracking-wide
  "
      >
        Track your spending, analyze habits and manage expenses
      </p>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
    hover:scale-[1.02]
    transition
    "
          >
            <p className="text-gray-300 text-lg">Total Expense</p>

            <h2 className="text-4xl font-extrabold mt-3 text-green-300">
              ₹{analytics.totalExpense}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Your spendings this month
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
    shadow-xl
    text-white
    hover:scale-[1.02]
    transition
    "
          >
            <p className="text-gray-300 text-lg">Total Transactions</p>

            <h2 className="text-4xl font-extrabold mt-3 text-cyan-300">
              {analytics.count}
            </h2>

            <p className="mt-3 text-sm text-gray-400">Expenses recorded</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
        <Expenseform
          fetchExpenses={fetchExpenses}
          fetchAnalytics={fetchAnalytics}
          selectedExpense={selectedExpense}
        />
        <Budget analytics={analytics} />
        <BudgetHistory />
        <Insights refresh={fetchAnalytics} />
      </div>
      <div className="flex gap-4 items-center mb-6">
        <input
          placeholder="Search expenses...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
flex-1
p-3
rounded-xl
bg-white/10
border
border-white/20
text-white
placeholder-gray-300
outline-none
"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
    w-48
    p-3
    rounded-xl
    bg-white/10
    backdrop-blur-lg
    border
    border-white/20
    text-white
    outline-none
    cursor-pointer
    shadow-lg
  "
        >
          <option className="bg-slate-900 text-white">All</option>

          <option className="bg-slate-900 text-white">Food</option>

          <option className="bg-slate-900 text-white">Travel</option>

          <option className="bg-slate-900 text-white">Shopping</option>

          <option className="bg-slate-900 text-white">Other</option>
        </select>
      </div>
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mt-8 mb-6">
        Your Expenses
        <span className="text-purple-300">💰</span>
      </h2>
      {loading ? (
        <Loader />
      ) : filteredExpenses.length === 0 ? (
        <h3>No expenses found</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExpenses.map((expense) => (
            <motion.div
              key={expense._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
  bg-white/10
  backdrop-blur-lg
  border
  border-white/20
  p-5
  rounded-2xl
  shadow-xl
  text-white
  "
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold tracking-wide text-white">
                  {expense.category}
                </h3>

                <span className="text-2xl font-bold text-green-300">
                  ₹{expense.amount}
                </span>
              </div>
              <p className="text-gray-300 mt-3">{expense.description}</p>

              <p className="text-sm text-gray-400 mt-2">
                📅 {expense.date.substring(0, 10)}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-xl transition"
                  onClick={() => editExpense(expense)}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-rose-500 hover:bg-rose-600 px-3 py-2 rounded-xl transition"
                  onClick={() => deleteExpense(expense._id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
