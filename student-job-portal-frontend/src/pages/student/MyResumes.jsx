import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/MyResumes.css";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [newName, setNewName] = useState("");

  const fetchResumes = async () => {
    const res = await api.get("/resumes");
    setResumes(res.data);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const deleteResume = async (id) => {
    await api.delete(`/resumes/${id}`);
    fetchResumes();
  };

  const renameResume = async (id) => {
    await api.patch(`/resumes/${id}`, { name: newName });
    setNewName("");
    fetchResumes();
  };

  return (
    <div className="resumes-container">
      <h2>My Resumes</h2>

      {resumes.length === 0 && <p>No resumes uploaded.</p>}

      {resumes.map((r) => (
        <div key={r.id} className="resume-card">
          <a href={r.file_path} target="_blank" rel="noreferrer">
            📄 {r.name}
          </a>

          <div className="resume-actions">
            <button className="btn btn-danger" onClick={() => deleteResume(r.id)}>
              Delete
            </button>
          </div>

          <input
            className="rename-input"
            placeholder="New resume name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={() => renameResume(r.id)} className="btn btn-primary">Rename</button>
        </div>
      ))}
    </div>
  );
}
