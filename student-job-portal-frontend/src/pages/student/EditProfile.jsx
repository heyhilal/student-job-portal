import { useEffect, useState } from "react";
import api from "../../services/api";
import UploadResume from "./UploadResume";
import "../../styles/EditProfile.css";

export default function EditProfile() {
  const [form, setForm] = useState({
    university: "",
    major: "",
    GPA: "",
  });

  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/student/profile").then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!resumeUploaded) {
      setError("You must upload a resume first.");
      return;
    }

    try {
      await api.put("/student/profile", form);
      setSuccess("Profile updated successfully ✅");
      setError("");
    } catch {
      setError("Failed to save profile ❌");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        <input
          className="profile-input"
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
        />

        <input
          className="profile-input"
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
        />

        <input
          className="profile-input"
          name="GPA"
          placeholder="GPA"
          value={form.GPA}
          onChange={handleChange}
        />

        <h3>Resume</h3>
        <UploadResume onUploadSuccess={() => setResumeUploaded(true)} />

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <button className="btn btn-primary" onClick={handleSubmit}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
