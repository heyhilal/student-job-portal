import db from "../config/db.js";

// upload resume 
export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  await db.query(
    "INSERT INTO resumes (user_id, name, file_path) VALUES (?, ?, ?)",
    [
      req.user.id,
      req.file.originalname,
      `/uploads/${req.file.filename}`
    ]
  );

  res.status(201).json({ message: "Resume uploaded" });
};

// List resumes (student)
export const getMyResumes = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, name, file_path FROM resumes WHERE user_id=?",
    [req.user.id]
  );
  res.json(rows);
};

// Delete resume
export const deleteResume = async (req, res) => {
  await db.query(
    "DELETE FROM resumes WHERE id=? AND user_id=?",
    [req.params.id, req.user.id]
  );
  res.json({ message: "Resume deleted" });
};

// Rename resume
export const renameResume = async (req, res) => {
  const { name } = req.body;

  await db.query(
    "UPDATE resumes SET name=? WHERE id=? AND user_id=?",
    [name, req.params.id, req.user.id]
  );
  res.json({ message: "Resume renamed" });
};
