import express from "express";
import {
  createJob,
  getAllJobs,
  getEmployerJobs,
  deleteJob
} from "../controllers/jobs.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createJob);
router.get("/", getAllJobs);
router.get("/employer/:id", getEmployerJobs);
router.delete("/:id", deleteJob);
router.get("/employer", getEmployerJobs);


export default router;
