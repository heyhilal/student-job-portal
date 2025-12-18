import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (role === "student") {
        await api.post("/auth/register-student", {
          email,
          password,
        });
      } else {
        await api.post("/auth/register-employer", {
          email,
          password,
        });
      }

      alert("Register successful ✅");
      navigate("/");
    } catch (err) {
      alert("Register failed ❌");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* 🔽 ROLE SEÇİMİ */}
      <div>
        <label>
          <input
            type="radio"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          Student
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            value="employer"
            checked={role === "employer"}
            onChange={() => setRole("employer")}
          />
          Employer
        </label>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
