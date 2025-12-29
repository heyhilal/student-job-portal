import db from "../config/db.js";

// GET pending employers
export const getPendingEmployers = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, email FROM users WHERE role='employer' AND status='pending'"
  );
  console.log("PENDING EMPLOYERS:", rows); // 👈 EKLE

  res.json(rows);
};

// PATCH approve / reject employer
export const updateEmployerStatus = async (req, res) => {
  const { status } = req.body; // approved | rejected
  const { id } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  await db.query(
    "UPDATE users SET status=? WHERE id=?",
    [status, id]
  );

  res.json({ message: "Employer status updated successfully" });
};
//admin data görüntüleme
export const getAdminDashboard = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      const [[students]] = await db.query(
        "SELECT COUNT(*) AS total FROM users WHERE role = 'student'"
      );
  
      const [[employers]] = await db.query(
        "SELECT COUNT(*) AS total FROM users WHERE role = 'employer'"
      );
  
      const [[jobs]] = await db.query(
        "SELECT COUNT(*) AS total FROM jobs"
      );
  
      const [[applications]] = await db.query(
        "SELECT COUNT(*) AS total FROM applications"
      );
  
      const [employerList] = await db.query(
        "SELECT id, email, status FROM users WHERE role = 'employer'"
      );
  
      res.json({
        stats: {
          students: students.total,
          employers: employers.total,
          jobs: jobs.total,
          applications: applications.total,
        },
        employers: employerList,
      });
    } catch (err) {
      console.error("ADMIN DASHBOARD ERROR:", err);
      res.status(500).json({ message: "Failed to load dashboard" });
    }
  };
  
// US-5.3.1 – View All Users
export const getAllUsers = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, email, role, status FROM users"
  );
  res.json(rows);
};