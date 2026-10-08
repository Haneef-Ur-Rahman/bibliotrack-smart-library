const mongoose = require("mongoose");

const bookAISchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      unique: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
    googleRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    internalPopularity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BookAI", bookAISchema);
