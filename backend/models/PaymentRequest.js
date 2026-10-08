// In models/PaymentRequest.js

const mongoose = require("mongoose");

const paymentRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    ref: "Member", // <-- CHANGE TO "Member"
    required: true,
  },
  paymentId: {
    // Link to the original challan
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  verifiedAt: {
    type: Date,
  },
  verifiedBy: {
    // Admin who verified it
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PaymentRequest", paymentRequestSchema);
