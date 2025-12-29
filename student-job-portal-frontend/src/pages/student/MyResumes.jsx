import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const res = await api.get("/resumes");
    setResumes(res.data);
  };

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
    <div>
      <h2>My Resumes</h2>

      {resumes.length === 0 && <p>No resumes uploaded.</p>}

      {resumes.map((r) => (
        <div key={r.id} style={{ marginBottom: "10px" }}>
          <a href={r.file_path} target="_blank">📄 {r.name}</a>

          <button onClick={() => deleteResume(r.id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>

          <div>
            <input
              placeholder="New resume name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={() => renameResume(r.id)}>Rename</button>
          </div>
        </div>
      ))}
    </div>
  );
}
