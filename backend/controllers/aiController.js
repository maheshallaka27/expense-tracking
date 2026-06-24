import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";
import askOllama from "../services/ollamaService.js";

export const chatAI = async (req, res) => {
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

    const prompt = `

You are a monthly personal finance assistant.

Analyze ONLY this month's expenses.

Budget:
${budget.amount}

Spent this month:
${total}

Expenses:
${JSON.stringify(expenses)}

User question:
${req.body.message}

Give practical advice.

`;

    const answer = await askOllama(prompt);

    res.json({
      answer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });

    const budget = await Budget.findOne({
      userId: req.userId,
    });

    let total = 0;

    let category = {};

    expenses.forEach((e) => {
      total += e.amount;

      category[e.category] = (category[e.category] || 0) + e.amount;
    });

    const topCategory = Object.keys(category).sort(
      (a, b) => category[b] - category[a],
    )[0];

    const prompt = `

You are a finance expert.

Monthly budget:
${budget?.amount || 0}

Total spent:
${total}

Highest spending category:
${topCategory}

Category breakdown:
${JSON.stringify(category)}

Give 3 short financial insights.
Use emojis.

`;

    const answer = await askOllama(prompt);

    res.json({
      insights: answer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const monthlyComparison = async (req, res) => {
  try {
    const now = new Date();

    // current month range
    const currentStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const currentEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // previous month range
    const previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const previousEnd = currentStart;

    const currentExpenses = await Expense.find({
      userId: req.userId,
      date: {
        $gte: currentStart,
        $lt: currentEnd,
      },
    });

    const previousExpenses = await Expense.find({
      userId: req.userId,
      date: {
        $gte: previousStart,
        $lt: previousEnd,
      },
    });

    const currentTotal = currentExpenses.reduce((sum, e) => sum + e.amount, 0);

    const previousTotal = previousExpenses.reduce(
      (sum, e) => sum + e.amount,
      0,
    );

    let change = 0;

    if (previousTotal !== 0) {
      change = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    res.json({
      currentMonth: currentTotal,

      previousMonth: previousTotal,

      change: Math.round(change),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const categorizeExpense = async (req, res) => {
  try {
    const { description } = req.body;

    const prompt = `
You are a finance assistant.

Classify this expense into one category.

Categories:
food,
transport,
shopping,
entertainment,
health,
education,
bills,
other

Expense:
${description}

Return only category name.
`;

    const response = await askOllama(prompt);

    res.json({
      category: response.trim(),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
