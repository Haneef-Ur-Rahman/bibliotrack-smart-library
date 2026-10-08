const mongoose = require("mongoose");
require("dotenv").config();
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("DB_URI is not defined");
    }
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error.message);
  }
};

module.exports = connectDB;
