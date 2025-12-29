import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => {
        console.log("ADMIN DASHBOARD RESPONSE:", res.data);
       setData(res.data);
      })
      .catch((err) => {
        console.error("ADMIN DASHBOARD ERROR:", err.response?.data || err.message);
      });
  }, []);

  if (!data) return <p>Loading admin dashboard...</p>;

  const { stats, employers } = data;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* 📊 STATS */}
      <div style={{ marginBottom: "20px" }}>
        <p><b>Total Students:</b> {stats.students}</p>
        <p><b>Total Employers:</b> {stats.employers}</p>
        <p><b>Total Jobs:</b> {stats.jobs}</p>
        <p><b>Total Applications:</b> {stats.applications}</p>
      </div>

      {/* 👔 EMPLOYERS */}
      <h3>Employers</h3>

      {employers.length === 0 ? (
        <p>No employers found.</p>
      ) : (
        employers.map((emp) => (
          <div
            key={emp.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <p><b>Email:</b> {emp.email}</p>
            <p><b>Status:</b> {emp.status}</p>

            {emp.status === "pending" && (
              <button
                onClick={() => navigate("/admin/verify-employers")}
              >
                Verify Employers
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
