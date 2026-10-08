// // models/IssuedBook.js
// const mongoose = require("mongoose");

// const issuedSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Member",
//     required: true,
//   },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
//   issueDate: { type: Date, default: Date.now },
//   dueDate: { type: Date }, // optional
//   returnDate: { type: Date, default: null },
// });

// module.exports = mongoose.model("IssuedBook", issuedSchema);

//------------------------------------------------------

// models/IssuedBook.js
const mongoose = require("mongoose");

const issuedSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date }, // optional
  returnDate: { type: Date, default: null },
  fine: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("IssuedBook", issuedSchema);
