import Expense from "../models/Expense.js";

//add expense

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    const expense = await Expense.create({
      userId: req.userId,
      amount,
      category,
      date,
      description,
    });

    res.status(201).json({
      message: "Expense added",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all expenses

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete expense

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (expense.userId.toString() !== req.userId) {
      return res.status(401).json({
        message: "Not Allowed",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update expenses

export const updateExpenses = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    //check ownership
    if (expense.userId.toString() !== req.userId) {
      return res.status(401).json({
        message: "Not allowed",
      });
    }
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      message: "Expense updated",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
