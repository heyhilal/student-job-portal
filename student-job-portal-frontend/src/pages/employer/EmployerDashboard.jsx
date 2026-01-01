import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/EmployerDashboard.css";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/employer");
      setJobs(res.data);
    } catch (err) {
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
      alert("Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="page-title">Employer Dashboard</h2>
      </div>

      {jobs.length === 0 ? (
        <p className="empty-text">
          You haven’t posted any jobs yet.
        </p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>

              <div className="job-actions">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/employer/applications/${job.id}`)
                  }
                >
                  View Applications
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
