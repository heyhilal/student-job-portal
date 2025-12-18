import { useState } from "react";
import api from "../services/api";
import LogoutButton from "../components/LogoutButton";


export default function JobPost() {
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
    });

    alert("Job created ✅");
  };

  return (
    <form onSubmit={handleSubmit}>
      <LogoutButton />
      <h2>Create Job</h2>
      
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Salary" onChange={(e) => setSalary(e.target.value)} />

      <button type="submit">Post Job</button>
    </form>
  );
}
