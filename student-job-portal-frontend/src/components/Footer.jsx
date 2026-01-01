import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <h3>StudentJob</h3>
          <p>
            A modern job portal connecting students with employers
            in a simple and efficient way.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* RIGHT */}
        <div className="footer-links">
          <h4>Roles</h4>
          <span>Students</span>
          <span>Employers</span>
          <span>Admin</span>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} StudentJob Portal. All rights reserved.
      </div>
    </footer>
  );
}
