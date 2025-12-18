import { useState } from "react";
import api from "../services/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    await api.post("/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Resume uploaded successfully 📄");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <button type="submit">Upload</button>
    </form>
  );
}
