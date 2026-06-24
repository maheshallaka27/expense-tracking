import User from "../models/Users.js";
import Expense from "../models/Expense.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    const expenses = await Expense.find({
      userId: req.userId,
    });
    let totalSpent = 0;
    expenses.forEach((expense) => {
      totalSpent += expense.amount;
    });

    res.json({
      user,
      totalExpenses: expenses.length,
      totalSpent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
