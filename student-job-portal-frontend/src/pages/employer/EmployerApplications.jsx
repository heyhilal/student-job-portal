import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/EmployerApplications.css";

const EmployerApplications = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="applications-container">
      <h2 className="applications-title">
        Applications for Job #{jobId}
      </h2>

      {applications.length === 0 && (
        <p>No applications for this job yet.</p>
      )}

      {applications.map((app) => (
        <div key={app.id} className="application-card">
          
          {/* 👤 STUDENT */}
          <div className="section">
            <div className="section-title">Student Profile</div>
            <div className="info-row"><b>Email:</b> {app.student_email}</div>
            <div className="info-row"><b>University:</b> {app.university || "N/A"}</div>
            <div className="info-row"><b>Major:</b> {app.major || "N/A"}</div>
            <div className="info-row"><b>GPA:</b> {app.gpa || "N/A"}</div>
          </div>

          {/* 📄 RESUME */}
          <div className="section">
            <div className="section-title">Resume</div>
            {app.resume_path ? (
              <a
                className="resume-link"
                href={`http://localhost:5050/${app.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            ) : (
              <div className="info-row">Not provided</div>
            )}
          </div>

          {/* 📌 STATUS */}
          <div className="section">
            <div className="section-title">Application Status</div>
            <span
              className={`status-badge status-${app.status}`}
            >
              {app.status}
            </span>
          </div>

          {/* 🎯 ACTIONS */}
          <div className="action-buttons">
            <button
              className="accept-btn"
              disabled={app.status === "accepted"}
              onClick={() => handleStatusChange(app.id, "accepted")}
            >
              Accept
            </button>

            <button
              className="reject-btn"
              disabled={app.status === "rejected"}
              onClick={() => handleStatusChange(app.id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployerApplications;
