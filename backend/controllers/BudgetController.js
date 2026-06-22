import Budget from "../models/Budget.js";

export const setBudget = async (req, res) => {
  try {
    const { amount, month } = req.body;

    const budget = await Budget.findOneAndUpdate(
      {
        userId: req.userId,
        month,
      },
      { amount },
      {
        upsert: true,
        new: true,
      },
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const month = new Date().toLocaleDateString("defailt", { month: "short" });

    const budget = await Budget.findOne({
      userId: req.userId,
      month,
    });

    res.json(budget || { amount: 0 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBudgetHistory = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
