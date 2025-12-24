import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo / Home */}
      <div>
        <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
          Student Job Portal
        </Link>
      </div>

      {/* Menu */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuthenticated && role === "student" && (
          <>
            <Link to="/student">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
          </>
        )}

        {isAuthenticated && role === "employer" && (
          <>
            <Link to="/employer">Dashboard</Link>
            <Link to="/employer/job-post">Post a Job</Link>
            <Link to="/employer/applications">Applications</Link>
          </>
        )}

        {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
