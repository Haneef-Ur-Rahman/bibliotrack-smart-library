const mongoose = require("mongoose");

const bookRequestSchema = new mongoose.Schema(
  {
    // --- Student Details (fetched automatically from logged-in user) ---
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // optional link to Member model
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    cnic: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    degree: {
      type: String,
      enum: ["BS", "MS", "PHD"],
      required: true,
      uppercase: true,
    },
    program: {
      type: String,
      enum: ["CS", "AI", "CSec", "DS", "SE"],
      required: true,
    },
    batchNo: { type: Number, required: true },
    rollNo: { type: Number, required: true },

    // --- Book Details (submitted by student) ---
    bookTitle: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    edition: { type: String, trim: true },
    category: { type: String, trim: true },
    isbn: { type: String, trim: true },

    // --- Admin Action ---
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminNote: { type: String, trim: true },
  },
  { timestamps: true },
);

const BookRequest = mongoose.model("BookRequest", bookRequestSchema);

module.exports = BookRequest;
