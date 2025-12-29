import express from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  uploadResume,
  getMyResumes,
  deleteResume,
  renameResume
} from "../controllers/resume.controller.js";

const router = express.Router();

// ✅ UPLOAD (Sprint 1)
router.post(
  "/upload",
  auth,
  upload.single("resume"), // 👈 FIELD NAME
  uploadResume
);

// LIST (Sprint 3)
router.get("/", auth, getMyResumes);

// DELETE
router.delete("/:id", auth, deleteResume);

// RENAME
router.patch("/:id", auth, renameResume);

export default router;
