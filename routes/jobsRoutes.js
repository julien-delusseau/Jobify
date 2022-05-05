import express from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";
const router = express.Router();

// Attention de mettre la route avec le params :id en dernière
router.route("/").post(createJob).get(getAllJob);
router.route("/stats").get(showStats);
router.route("/:id").patch(updateJob).delete(deleteJob);

export default router;
