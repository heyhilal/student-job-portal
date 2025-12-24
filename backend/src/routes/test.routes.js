import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.middleware.js";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

// 🔐 Token test
router.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// 🧪 DB connection test
router.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT 1 AS db_test");
    res.status(200).json({
      success: true,
      message: "Database connection successful 🚀",
      result: rows,
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed ❌",
      error: error.message,
    });
  }
});

// 🧪 Login test (aynı controller)
router.post("/login", login);

export default router;
