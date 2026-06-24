import express from "express";
import {
  chatAI,
  monthlyComparison,
  categorizeExpense,
} from "../controllers/aiController.js";
import { getFinancialScore } from "../controllers/financeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, chatAI);
router.get("/financial-score", protect, getFinancialScore);
router.get("/monthly-comparison", protect, monthlyComparison);
router.post("/categorize", protect, categorizeExpense);
export default router;
