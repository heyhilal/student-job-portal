import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // 🔐 KAYDET
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 👉 YÖNLENDİR
      if (res.data.role === "employer") {
        navigate("/job-post");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <p>
        Don't you have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}