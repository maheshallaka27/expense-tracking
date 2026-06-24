import { useEffect, useState } from "react";
import api from "../api/axios.js";

const ReportHistory = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/report/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReports(res.data);
  };

  useEffect(() => {
    fetchReports();
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
"
    >
      <h2
        className="
text-2xl
font-bold
mb-5
"
      >
        Report History 📄
      </h2>

      <div
        className="
space-y-4
max-h-80
overflow-y-auto
"
      >
        {reports.map((report) => (
          <div
            key={report._id}
            className="
bg-black/20
p-4
rounded-xl
flex
justify-between
items-center
"
          >
            <div>
              <p className="font-bold">{report.month}</p>

              <p className="text-gray-300">Spent: ₹{report.totalSpent}</p>

              <p className="text-sm text-gray-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              className="
bg-gradient-to-r
from-cyan-500
to-purple-500
px-4
py-2
rounded-xl
font-bold
"
              onClick={async () => {
                const token = localStorage.getItem("token");

                const res = await api.get("/report", {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: "blob",
                });

                const url = window.URL.createObjectURL(new Blob([res.data]));

                const link = document.createElement("a");

                link.href = url;

                link.download = "expense-report.pdf";

                link.click();
              }}
            >
              Download 📄
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportHistory;
