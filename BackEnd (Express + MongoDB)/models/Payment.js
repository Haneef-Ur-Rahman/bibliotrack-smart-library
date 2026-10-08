// // In models/Payment.js

// // --- FIX: Add this line to import mongoose ---
// const mongoose = require("mongoose");

// // --- FIX: Renamed from 'fineSchema' to 'paymentSchema' for clarity ---
// const paymentSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Member",
//     required: true,
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   challanNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "paid", "overdue"],
//     default: "pending",
//   },
//   issueDate: {
//     type: Date,
//     default: Date.now,
//   },
//   dueDate: {
//     type: Date,
//   },
//   lateFeePerDay: {
//     type: Number,
//     default: 50,
//   },
//   currentLateFee: {
//     type: Number,
//     default: 0,
//   },
//   verifiedAt: {
//     type: Date,
//   },
// });

// module.exports = mongoose.model("Payment", paymentSchema);

//------------------------------------------------------------------------------

// const mongoose = require("mongoose");
// const paymentSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Member",
//     required: true,
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   challanNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "paid", "overdue"],
//     default: "pending",
//   },
//   issueDate: {
//     type: Date,
//     default: Date.now,
//   },
//   dueDate: {
//     type: Date,
//   },
//   lateFeePerDay: {
//     type: Number,
//     default: 100,
//   },
//   currentLateFee: {
//     type: Number,
//     default: 0,
//   },
//   verifiedAt: {
//     type: Date,
//   },
//   // Add this fineDetails field to store detailed information about each book with fines
//   fineDetails: [
//     {
//       bookId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Book",
//         required: true,
//       },
//       title: {
//         type: String,
//         required: true,
//       },
//       author: {
//         type: String,
//         required: true,
//       },
//       isbn: {
//         type: String,
//         required: true,
//       },
//       fine: {
//         type: Number,
//         required: true,
//       },
//       dueDate: {
//         type: Date,
//         required: true,
//       },
//       issueDate: {
//         type: Date,
//         required: true,
//       },
//     },
//   ],
// });
// module.exports = mongoose.model("Payment", paymentSchema);

//---------------------------------------------------------------------
// In models/Payment.js
const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  challanNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "overdue"],
    default: "pending",
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  lateFeePerDay: {
    type: Number,
    default: 100,
  },
  currentLateFee: {
    type: Number,
    default: 0,
  },
  verifiedAt: {
    type: Date,
  },
  // Add this fineDetails field to store detailed information about each book with fines
  fineDetails: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      isbn: {
        type: String,
        required: true,
      },
      originalFine: {
        type: Number,
        default: 0, // The original fine without late fees
      },
      fine: {
        type: Number,
        default: 0, // The total fine including late fees
      },
      dueDate: {
        type: Date,
        required: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Payment", paymentSchema);
