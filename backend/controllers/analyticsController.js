import Expense from "../models/Expense.js";

export const getAnalytics = async (req, res) => {
  try {
    const currentMonth = new Date().toLocaleString("default", {
      month: "short",
    });

    const expenses = await Expense.find({
      userId: req.userId,
    });

    const monthlyExpenses = expenses.filter((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });

      return month === currentMonth;
    });
    let total = 0;
    const category = {};
    let monthlyExpense = {};
    monthlyExpenses.forEach((expense) => {
      total += expense.amount;
      if (category[expense.category]) {
        category[expense.category] += expense.amount;
      } else {
        category[expense.category] = expense.amount;
      }
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });

      monthlyExpense[month] = (monthlyExpense[month] || 0) + expense.amount;
    });
    const average =
      monthlyExpenses.length > 0 ? total / monthlyExpenses.length : 0;
    res.status(200).json({
      totalExpense: total,
      categoryExpense: category,
      count: monthlyExpenses.length,
      averageExpense: average,
      monthlyExpense: monthlyExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
