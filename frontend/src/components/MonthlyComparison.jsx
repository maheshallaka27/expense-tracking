import { useEffect, useState } from "react";
import api from "../api/axios.js";

const MonthlyComparison = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/ai/monthly-comparison", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    };

    load();
  }, []);

  if (!data) return null;

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
      <h2 className="text-2xl font-bold">📈 Monthly Comparison</h2>

      <div className="mt-5 space-y-3">
        <p>
          This month:
          <span className="font-bold">₹{data.currentMonth}</span>
        </p>

        <p>
          Last month:
          <span className="font-bold">₹{data.previousMonth}</span>
        </p>

        <p className={data.change > 0 ? "text-red-400" : "text-green-400"}>
          {data.change > 0
            ? `⚠️ Spending increased ${data.change}%`
            : `✅ Spending reduced ${Math.abs(data.change)}%`}
        </p>
      </div>
    </div>
  );
};

export default MonthlyComparison;
