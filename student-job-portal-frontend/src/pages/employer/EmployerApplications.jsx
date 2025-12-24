import { useEffect, useState } from "react";
import {
  getEmployerApplications,
  updateApplicationStatus,
} from "../../api/application.api";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await getEmployerApplications();
      setApplications(res.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      // state güncelle (DOĞRU ID İLE)
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId
            ? { ...app, status }
            : app
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
      <h2>Job Applications</h2>

      {applications.length === 0 && <p>No applications yet.</p>}

      {applications.map((app) => (
        <div
          key={app.application_id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p>
            <strong>Student Email:</strong> {app.student_email}
          </p>

          <p>
            <strong>Job:</strong> {app.job_title}
          </p>

          <p>
            <strong>Status:</strong> {app.status}
          </p>

          <div style={{ marginTop: "10px" }}>
            <button
              disabled={app.status === "accepted"}
              onClick={() =>
                handleStatusChange(app.application_id, "accepted")
              }
            >
              Accept
            </button>

            <button
              disabled={app.status === "rejected"}
              onClick={() =>
                handleStatusChange(app.application_id, "rejected")
              }
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
