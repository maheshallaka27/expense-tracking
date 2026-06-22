import express from "express";
import {
  setBudget,
  getBudget,
  getBudgetHistory,
} from "../controllers/BudgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, setBudget);
router.get("/", protect, getBudget);
router.get("/history", protect, getBudgetHistory);
export default router;
