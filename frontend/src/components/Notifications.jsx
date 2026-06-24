import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = async () => {
    try {
      const token = localStorage.getItem("token");

      const budgetRes = await api.get("/category-budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let messages = [];

      budgetRes.data.forEach((b) => {
        if (b.percentage >= 90) {
          messages.push(`⚠️ ${b.category} budget is ${b.percentage}% used`);
        } else if (b.percentage >= 70) {
          messages.push(`🟡 ${b.category} spending is getting high`);
        }
      });

      if (messages.length === 0) {
        messages.push("🟢 Everything looks good. Keep managing money!");
      }

      setAlerts(messages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

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
shadow-xl
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
        🔔 Alerts
      </h2>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div
            key={i}
            className="
bg-black/20
rounded-xl
p-4
"
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
