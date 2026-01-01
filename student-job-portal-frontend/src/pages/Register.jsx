import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="role-group">
            <label className="role-option">
              <input
                type="radio"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              Student
            </label>

            <label className="role-option">
              <input
                type="radio"
                checked={role === "employer"}
                onChange={() => setRole("employer")}
              />
              Employer
            </label>
          </div>

          <button className="auth-button" type="submit">
            Register
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}
