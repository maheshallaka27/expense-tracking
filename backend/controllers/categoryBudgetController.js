import CategoryBudget from "../models/CategoryBudget.js";
import Expense from "../models/Expense.js";
// create/update budget

export const setCategoryBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    let budget = await CategoryBudget.findOne({
      userId: req.userId,
      category,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await CategoryBudget.create({
        userId: req.userId,
        category,
        amount,
      });
    }

    res.json(budget);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get all category budgets

export const getCategoryBudgets = async (req, res) => {
  try {
    const budgets = await CategoryBudget.find({
      userId: req.userId,
    });

    const expenses = await Expense.find({
      userId: req.userId,
    });

    const result = budgets.map((budget) => {
      let spent = 0;

      expenses.forEach((expense) => {
        if (
          String(expense.category).toLowerCase() ===
          String(budget.category).toLowerCase()
        ) {
          spent += Number(expense.amount);
        }
      });

      let percentage = 0;

      if (budget.amount > 0) {
        percentage = Math.round((spent / budget.amount) * 100);
      }

      return {
        _id: budget._id,

        category: budget.category,

        limit: Number(budget.amount),

        spent,

        percentage,
      };
    });

    res.json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
