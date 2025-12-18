import { useEffect, useState } from "react";
import api from "../services/api";
import LogoutButton from "../components/LogoutButton";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await api.get("/applications/employer");
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}`, { status });
      alert(`Application ${status} ✅`);

      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      alert("Status update failed ❌");
    }
  };

  return (
    <div>
      <LogoutButton />
      <h2>Job Applications</h2>

      {applications.map((app) => (
        <div
          key={app.application_id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{app.job_title}</h3>
          <p><b>Student:</b> {app.student_email}</p>
          <p><b>Status:</b> {app.status}</p>

          {app.resume_path && (
            <a
              href={`http://localhost:5050/${app.resume_path}`}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          )}

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() =>
                handleStatusUpdate(app.application_id, "accepted")
              }
              disabled={app.status !== "pending"}
            >
              Accept
            </button>

            <button
              onClick={() =>
                handleStatusUpdate(app.application_id, "rejected")
              }
              disabled={app.status !== "pending"}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
