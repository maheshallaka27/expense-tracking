import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (error) {
    console.log("DB connection failed");
    console.log("DB err:", error.message);
    process.exit(1);
  }
};
