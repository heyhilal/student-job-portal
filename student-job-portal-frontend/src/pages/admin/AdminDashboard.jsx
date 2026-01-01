import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => {
        setStats(res.data.stats);
      })
      .catch((err) => {
        console.error("Admin dashboard error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading admin dashboard...</p>;

  return (
    <div className="admin-container">
      <h1 className="page-title">Admin Dashboard</h1>

      {/* === STATS === */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Students</span>
          <strong>{stats.students}</strong>
        </div>

        <div className="stat-card">
          <span>Total Employers</span>
          <strong>{stats.employers}</strong>
        </div>

        <div className="stat-card">
          <span>Total Jobs</span>
          <strong>{stats.jobs}</strong>
        </div>

        <div className="stat-card">
          <span>Total Applications</span>
          <strong>{stats.applications}</strong>
        </div>
      </div>

      {/* === QUICK ACTIONS === */}
      <div className="admin-actions">
        <Link to="/admin/employers" className="action-card">
          🏢 Verify Employers
        </Link>

        <Link to="/admin/jobs" className="action-card">
          📄 Manage Jobs
        </Link>

        <Link to="/admin/users" className="action-card">
          👥 View Users
        </Link>
      </div>
    </div>
  );
}
