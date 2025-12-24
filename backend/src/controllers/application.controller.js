import { db } from "../config/db.js";

/* =========================
   STUDENT → APPLY TO JOB
========================= */
export const applyToJob = async (req, res) => {
  try {
    // 🔍 DEBUG (şimdilik kalsın, sonra silebilirsin)
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    const studentId = req.user?.id;
    const jobId = req.body?.jobId; // camelCase API contract

    // 🔒 Güvenlik kontrolleri
    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID required" });
    }

    // ✅ INSERT
    await db
      .promise()
      .query(
        "INSERT INTO applications (job_id, student_id) VALUES (?, ?)",
        [jobId, studentId]
      );

    return res.status(201).json({ message: "Applied successfully ✅" });

  } catch (error) {
    // 🔁 Aynı ilana ikinci kez başvuru
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Already applied to this job" });
    }

    console.error("APPLY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
STUDENT → VIEW APPLICATIONS
========================= */
export const getStudentApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [rows] = await db.promise().query(
      `
      SELECT
        a.id AS application_id,
        a.status,
        a.applied_at,
        j.title AS job_title
      FROM applications a
      JOIN jobs j ON j.id = a.job_id
      WHERE a.student_id = ?
      ORDER BY a.applied_at DESC
      `,
      [studentId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("getStudentApplications error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   EMPLOYER → VIEW APPLICATIONS
========================= */
export const getEmployerApplications = async (req, res) => {
  try {
    const employerId = req.user.id;

    const [rows] = await db.promise().query(
      `
      SELECT 
        a.id AS application_id,
        a.status,
        a.applied_at,

        j.id AS job_id,
        j.title AS job_title,

        u.email AS student_email
      FROM applications a
      JOIN jobs j ON j.id = a.job_id
      JOIN users u ON u.id = a.student_id
      WHERE j.employer_id = ?
      ORDER BY a.applied_at DESC
      `,
      [employerId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("GET EMPLOYER APPLICATIONS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   EMPLOYER → ACCEPT / REJECT
========================= */


export const updateApplicationStatus = async (req, res) => {
  console.log("🔥 UPDATE STATUS CONTROLLER ÇALIŞTI");
  console.log("PARAM ID:", req.params.id);
  console.log("BODY:", req.body);
  try {
    const { id } = req.params; // application_id
    const { status } = req.body;

    // status kontrolü
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // application var mı?
    const [rows] = await db.promise().query(
      "SELECT id FROM applications WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    // status update
    await db.promise().query(
      "UPDATE applications SET status = ? WHERE id = ?",
      [status, id]
    );

    return res.json({ message: "Status updated ✅" });
  } catch (err) {
    console.error("updateApplicationStatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
