import { useState } from "react";
import { applyToJob } from "../api/application.api";
import { useAuth } from "../context/AuthContext";
import "../styles/JobCard.css";

const JobCard = ({ job, onApplied }) => {
  const { role } = useAuth();

  const [applied, setApplied] = useState(Boolean(job.applied));
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyToJob(job.id);
      setApplied(true);

      if (onApplied) {
        await onApplied();
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to apply ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-card">
      {/* HEADER */}
      <div className="job-header">
        <div>
          <div className="job-title">{job.title}</div>
          <div className="job-company">{job.companyName}</div>
        </div>
      </div>

      {/* BADGES */}
      <div className="job-badges">
        {job.location && (
          <span className="job-badge">{job.location}</span>
        )}
        {job.jobType && (
          <span className="job-badge">{job.jobType}</span>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="job-description">
        {job.description}
      </div>

      {/* FOOTER */}
      <div className="job-footer">
        <div className="job-salary">
          {job.salary ? `${job.salary} ₺` : "Salary not specified"}
        </div>

        {role === "student" && (
          <button
            className={`btn btn-primary apply-btn ${
              applied ? "applied" : ""
            }`}
            onClick={handleApply}
            disabled={applied || loading}
          >
            {applied ? "Applied" : loading ? "Applying..." : "Apply"}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
