import { useState } from "react";
import { applyToJob } from "../api/application.api";
import { useAuth } from "../context/AuthContext";

const JobCard = ({ job, onApplied }) => {
  const { role } = useAuth();

  const [applied, setApplied] = useState(Boolean(job.applied));
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);

      // sadece job.id gönderiyoruz
      await applyToJob(job.id);

      setApplied(true);

      // 🔥 StudentDashboard'a haber ver
      if (onApplied) {
        await onApplied();
      }

      alert("Applied successfully ✅");
    } catch (err) {
      console.error("Apply error:", err);
      alert(err?.response?.data?.message || "Failed to apply for this job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h3>{job.title}</h3>

      <p>
        <strong>Company:</strong> {job.companyName}
      </p>

      <p>{job.description}</p>

      {/* SADECE STUDENT APPLY GÖRÜR */}
      {role === "student" && (
        <button
          onClick={handleApply}
          disabled={applied || loading}
          style={{
            marginTop: "10px",
            cursor: applied || loading ? "not-allowed" : "pointer",
          }}
        >
          {applied ? "Applied" : loading ? "Applying..." : "Apply"}
        </button>
      )}
    </div>
  );
};

export default JobCard;
