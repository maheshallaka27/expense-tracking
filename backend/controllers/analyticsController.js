import Expense from "../models/Expense.js";

export const getAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });

    let total = 0;
    const category = {};
    expenses.forEach((expense) => {
      total += expense.amount;
      if (category[expense.category]) {
        category[expense.category] += expense.amount;
      } else {
        category[expense.category] = expense.amount;
      }
    });
    res.status(200).json({
      totalExpense: total,
      categoryExpense: category,
      count: expenses.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
