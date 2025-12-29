import { useEffect, useState } from "react";
import api from "../../services/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resumes");
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchResumes();
  }, []);

  const handleApply = async (jobId) => {
    if (!selectedResume) {
      alert("Please select a resume before applying ❗");
      return;
    }

    try {
      await api.post("/applications", {
        jobId: jobId,
        resumeId: selectedResume,
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
      <h2>Available Jobs</h2>

      {/* RESUME SELECT */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Select Resume:{" "}
          <select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
          >
            <option value="">-- Select Resume --</option>
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {jobs.length === 0 && <p>No jobs found.</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Job Type:</b> {job.jobType}</p>
          <p><b>Salary:</b> {job.salary}</p>

          <button onClick={() => handleApply(job.id)}>
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}
