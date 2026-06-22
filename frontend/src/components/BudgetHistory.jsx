import { useEffect, useState } from "react";
import api from "../api/axios.js";

const BudgetHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/budget/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
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
shadow-xl
text-white
mt-6
"
    >
      <h2
        className="
text-2xl
font-bold
mb-5
"
      >
        Budget History 📜
      </h2>
      <div className="max-h-64 overflow-y-auto pr-2 scrollbar-hide">
        {history.length === 0 ? (
          <p>No budgets found</p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="
bg-black/20
p-4
rounded-xl
mb-3
flex
justify-between
"
            >
              <div>
                <p className="font-bold">{item.month}</p>

                <p className="text-gray-300">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-xl font-bold">₹{item.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BudgetHistory;
