import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
//database
connectDB();

//server
app.listen(5000, () => {
  console.log("server in running on port:5000");
});
