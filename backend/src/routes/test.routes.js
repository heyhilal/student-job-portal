import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.middleware.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

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

router.post("/login", authController.login);

export default router;

