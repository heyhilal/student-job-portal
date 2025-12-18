import { useState } from "react";
import api from "../services/api";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/jobs", {
      title,
      description,
      location,
      salary,
      employer_id: 1 // şimdilik sabit
    });

    alert("Job created ✅");
    setTitle("");
    setDescription("");
    setLocation("");
    setSalary("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Job</h2>

      <input placeholder="Title" value={title}
        onChange={(e) => setTitle(e.target.value)} />

      <textarea placeholder="Description" value={description}
        onChange={(e) => setDescription(e.target.value)} />

      <input placeholder="Location" value={location}
        onChange={(e) => setLocation(e.target.value)} />

      <input placeholder="Salary" value={salary}
        onChange={(e) => setSalary(e.target.value)} />

      <button type="submit">Create</button>
    </form>
  );
}

export default JobForm;
