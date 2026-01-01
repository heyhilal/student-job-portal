import { useState } from "react";
import api from "../services/api";
import "../styles/JobForm.css";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/jobs", {
        title,
        description,
        location,
        salary,
        employer_id: 1 // şimdilik sabit
      });

      setMessage("Job created successfully ✅");
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job ❌");
    }
  };

  return (
    <div className="jobform-container">
      <div className="jobform-card">
        <h2 className="jobform-title">Create Job</h2>

        <form className="jobform" onSubmit={handleSubmit}>
          <input
            className="jobform-input"
            placeholder="Job Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="jobform-textarea"
            placeholder="Job Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="jobform-input"
            placeholder="Location"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="jobform-input"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button className="jobform-btn" type="submit">
            Create Job
          </button>
        </form>

        {message && <p className="jobform-success">{message}</p>}
        {error && <p className="jobform-error">{error}</p>}
      </div>
    </div>
  );
}

export default JobForm;
