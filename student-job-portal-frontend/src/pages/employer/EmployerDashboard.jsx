import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/employer");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load your job posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employer Dashboard</h2>

      <button onClick={() => navigate("/employer/job-post")}>
        + Post New Job
      </button>

      <h3 style={{ marginTop: "20px" }}>My Job Posts</h3>

      {jobs.length === 0 ? (
        <p>You haven’t posted any jobs yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <h4>{job.title}</h4>
            <p>{job.description}</p>

            <button
              onClick={() => navigate("/employer/applications")}
            >
              View Applications
            </button>

            <button
              onClick={() => handleDelete(job.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerDashboard;
