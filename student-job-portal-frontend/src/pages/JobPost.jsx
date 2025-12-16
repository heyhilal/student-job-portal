import { useState } from "react";
import api from "../services/api";

export default function JobPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/jobs", { title, description });
      alert("Job posted!");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <button onClick={handleSubmit}>Post Job</button>
    </div>
  );
}
