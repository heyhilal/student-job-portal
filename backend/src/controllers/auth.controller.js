import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    console.log("👉 LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    console.log("👉 DB RESULT:", rows);

    if (rows.length === 0) {
      console.log("❌ USER NOT FOUND");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    console.log("👉 HASHED PASSWORD FROM DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      console.log("❌ PASSWORD DOES NOT MATCH");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ LOGIN SUCCESS FOR:", email);

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= REGISTER (GENERIC) =================
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password and role are required" });
    }

    if (!["student", "employer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const [existing] = await db
      .promise()
      .query("SELECT id FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, hashedPassword, role]
      );

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Register failed" });
  }
};
