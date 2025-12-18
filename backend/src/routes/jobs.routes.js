import express from "express";
import {
  createJob,
  getAllJobs,
  getEmployerJobs,
  deleteJob
} from "../controllers/jobs.controller.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/employer/:id", getEmployerJobs);
router.delete("/:id", deleteJob);

export default router;
