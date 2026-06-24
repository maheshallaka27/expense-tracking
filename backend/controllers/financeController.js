import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";
export const getFinancialScore = async (req, res) => {
  try {
    const start = new Date();

    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();

    end.setMonth(end.getMonth() + 1);
    end.setDate(1);
    end.setHours(0, 0, 0, 0);

    const expenses = await Expense.find({
      userId: req.userId,

      date: {
        $gte: start,
        $lt: end,
      },
    });

    const budget = await Budget.findOne({
      userId: req.userId,
    });

    let total = 0;

    expenses.forEach((e) => {
      total += e.amount;
    });

    let score = 100;

    if (budget) {
      const usage = (total / budget.amount) * 100;

      if (usage >= 100) score -= 40;
      else if (usage >= 80) score -= 25;
      else if (usage >= 60) score -= 10;
    }

    if (expenses.length > 15) score -= 10;

    score = Math.min(100, Math.max(0, score));

    let status;

    if (score >= 80) status = "Excellent";
    else if (score >= 60) status = "Good";
    else if (score >= 40) status = "Average";
    else status = "Poor";

    res.json({
      score,
      status,

      // this is now monthly
      totalSpent: total,

      transactions: expenses.length,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
