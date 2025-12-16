import { useEffect, useState } from "react";
import api from "../services/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(() => alert("Failed to load jobs"));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs yet.</p>}

      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <small>Posted by: {job.employer_email}</small>
        </div>
      ))}
    </div>
  );
}
