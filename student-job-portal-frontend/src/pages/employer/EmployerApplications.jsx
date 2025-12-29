import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EmployerApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
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
    <div style={{ padding: "20px" }}>
      <h2>Applications for Job {jobId}</h2>

      {applications.length === 0 && (
        <p>No applications for this job yet.</p>
      )}

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "6px",
          }}
        >
          {/* 👤 STUDENT PROFILE */}
          <h4>Student Profile</h4>

          <p><b>Email:</b> {app.student_email}</p>
          <p><b>University:</b> {app.university || "N/A"}</p>
          <p><b>Major:</b> {app.major || "N/A"}</p>
          <p><b>GPA:</b> {app.gpa || "N/A"}</p>

          {/* 📄 RESUME */}
          {app.resume_path ? (
            <p>
              <b>Resume:</b>{" "}
              <a
                href={`http://localhost:5050/${app.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            </p>
          ) : (
            <p><b>Resume:</b> Not provided</p>
          )}

          {/* 📌 STATUS */}
          <p><b>Application Status:</b> {app.status}</p>

          {/* 🎯 ACTIONS */}
          <div style={{ marginTop: "10px" }}>
            <button
              disabled={app.status === "accepted"}
              onClick={() => handleStatusChange(app.id, "accepted")}
            >
              Accept
            </button>

            <button
              disabled={app.status === "rejected"}
              onClick={() => handleStatusChange(app.id, "rejected")}
              style={{ marginLeft: "10px" }}
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
