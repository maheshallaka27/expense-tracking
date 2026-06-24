import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import api from "../api/axios.js";
import MonthlyComparison from "../components/MonthlyComparison.jsx";
import ReportHistory from "../components/ReportHistory.jsx";
import Loader from "./Loader.jsx";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
function Analytics() {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/expenses/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);
  if (!data) {
    return <Loader />;
  }

  const chartData = Object.keys(data.categoryExpense).map((key) => ({
    name: key,
    amount: data.categoryExpense[key],
  }));
  const monthlyData = Object.keys(data.monthlyExpense).map((month) => ({
    name: month,
    amount: data.monthlyExpense[month],
  }));
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <Navbar />
      <h1
        className="
      text-5xl
      font-extrabold
      mb-4
      bg-gradient-to-r
      from-cyan-300
      via-purple-300
      to-pink-400
      bg-clip-text
      text-transparent
      "
      >
        Expense Analytics
      </h1>
      <p className="text-gray-300 text-lg mb-8">
        Visualize your spending patterns and manage your money better
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      shadow-xl
      "
        >
          <h2 className="text-white text-2xl font-bold mb-4">
            Category Spending
          </h2>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={30}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={["#22d3ee", "#a855f7", "#f43f5e", "#34d399"][index % 4]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "white",
                paddingTop: "20px",
              }}
            />
          </PieChart>
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
      "
        >
          <h2 className="text-2xl font-bold text-white mb-5">
            Spending Overview
          </h2>
          <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                color: "white",
              }}
            />
            <Bar dataKey="amount" fill="#22d3ee" radius={[10, 10, 0, 0]} />
          </BarChart>
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
    lg:col-span-2
    "
        >
          <h2 className="text-white text-2xl font-bold mb-4">
            Monthly Spending
          </h2>
          <BarChart width={500} height={300} data={monthlyData}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                color: "white",
              }}
            />
            <Bar dataKey="amount" fill="#a855f7" radius={[10, 10, 0, 0]} />
          </BarChart>
        </div>
      </div>
      <div className="mt-6">
        <MonthlyComparison />
        <ReportHistory />
      </div>
    </div>
  );
}
export default Analytics;
