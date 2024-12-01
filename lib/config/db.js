// db.js
import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://blog:blog3103@cluster0.3cf7j.mongodb.net/blog-app');
    console.log("DataBase Connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
