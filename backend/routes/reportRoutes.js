import express from "express";
import { generateReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, generateReport);
router.get("/history", protect, getReports);
export default router;
