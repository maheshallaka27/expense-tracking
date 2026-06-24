import PDFDocument from "pdfkit";
import Expense from "../models/Expense.js";
import Report from "../models/Report.js";
export const generateReport = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    });

    let total = 0;

    expenses.forEach((expense) => {
      total += expense.amount;
    });
    await Report.create({
      userId: req.userId,

      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),

      totalSpent: total,
    });
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense-report.pdf",
    );

    const doc = new PDFDocument();

    doc.pipe(res);

    doc.fontSize(25).text("Expense Report", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(15).text(`Total Spent: Rs.${total}`);

    doc.moveDown();

    expenses.forEach((expense) => {
      doc
        .fontSize(12)
        .text(
          `${expense.category} - Rs.${expense.amount} - ${expense.description}`,
        );
    });

    // only end PDF
    doc.end();
  } catch (error) {
    console.log(error);

    if (!res.headersSent) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
