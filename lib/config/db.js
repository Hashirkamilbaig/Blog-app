// db.js
import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase Connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
