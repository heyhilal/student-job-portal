import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">

      <section className="hero">
        <h1 className="hero-title">Student Job Portal</h1>
        <p className="hero-subtitle">
          A modern platform where students find opportunities  
          and employers discover talent.
        </p>

        <div className="hero-actions">
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>

          <Link to="/register">
            <button className="btn btn-outline">Register</button>
          </Link>
        </div>
      </section>

      <section className="roles section">
        <div className="role-card">
          <h3>🎓 Students</h3>
          <p>Browse jobs, upload resumes and track applications.</p>
        </div>

        <div className="role-card">
          <h3>🏢 Employers</h3>
          <p>Post jobs, review applications and manage hiring.</p>
        </div>

        <div className="role-card">
          <h3>🛡️ Admin</h3>
          <p>Verify employers and manage the platform.</p>
        </div>
      </section>

      <section className="features section">
        <div className="feature-card">
          <h4>🚀 Fast Applications</h4>
          <p>Apply to jobs with one click using your resume.</p>
        </div>

        <div className="feature-card">
          <h4>📄 Resume Management</h4>
          <p>Upload, rename and manage your resumes easily.</p>
        </div>

        <div className="feature-card">
          <h4>📊 Dashboards</h4>
          <p>Dedicated dashboards for students, employers and admins.</p>
        </div>
      </section>

    </div>
  );
}
