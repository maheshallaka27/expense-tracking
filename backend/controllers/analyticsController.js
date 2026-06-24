import Expense from "../models/Expense.js";

export const getAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });

    const currentMonth = new Date().toLocaleString("default", {
      month: "short",
    });

    const monthlyExpenses = expenses.filter((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });

      return month === currentMonth;
    });

    let total = 0;

    const category = {};

    // create last 6 months
    const monthlyExpense = {};

    for (let i = 5; i >= 0; i--) {
      const d = new Date();

      d.setMonth(d.getMonth() - i);

      const month = d.toLocaleString("default", {
        month: "short",
      });

      monthlyExpense[month] = 0;
    }

    // current month calculations

    monthlyExpenses.forEach((expense) => {
      total += expense.amount;

      category[expense.category] =
        (category[expense.category] || 0) + expense.amount;
    });

    // all months calculations

    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });

      if (monthlyExpense[month] !== undefined) {
        monthlyExpense[month] += expense.amount;
      }
    });

    const average =
      monthlyExpenses.length > 0 ? total / monthlyExpenses.length : 0;

    res.status(200).json({
      totalExpense: total,

      categoryExpense: category,

      count: monthlyExpenses.length,

      averageExpense: average,

      monthlyExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
