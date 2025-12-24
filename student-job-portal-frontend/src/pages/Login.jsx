import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
  
      console.log("LOGIN RESPONSE:", res.data);
  
      const token = res.data.token;
      const role = res.data.role;
  
      // backend user objesi dönmüyorsa biz oluşturuyoruz
      const user = {
        email,
        role,
      };
  
      login(user, token, role);
  
      if (role === "employer") {
        navigate("/employer/job-post");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };
  
    
  

  return (
    <div className="page">
      <form onSubmit={handleLogin} className="card">
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

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
