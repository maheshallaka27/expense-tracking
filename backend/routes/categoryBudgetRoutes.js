import express from "express";

import {
  setCategoryBudget,
  getCategoryBudgets,
} from "../controllers/categoryBudgetController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, setCategoryBudget);

router.get("/", protect, getCategoryBudgets);

export default router;
