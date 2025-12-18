import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";



export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await api.post("/applications", {
        job_id: jobId,
      });
      alert("Applied successfully ✅");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("You already applied to this job ⚠️");
      } else {
        alert("Apply failed ❌");
      }
    }
  };

  return (
    <div>
      <LogoutButton />
            {/* 🔽 STUDENT AKSİYONLARI */}
            <div style={{ marginBottom: "20px" }}>
        <Link to="/upload-resume">
          <button>Upload Resume</button>
        </Link>
      </div>
      <h2>Available Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>
          <button onClick={() => handleApply(job.id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}
