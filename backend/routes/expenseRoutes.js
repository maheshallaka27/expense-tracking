import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpenses,
} from "../controllers/expenseController.js";
import { getAnalytics } from "../controllers/analyticsController.js";
const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpenses);
router.get("/analytics", protect, getAnalytics);
export default router;
