// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reservationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "issued", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
