// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     author: { type: String, required: true, trim: true },
//     edition: { type: String, trim: true },
//     category: { type: String, trim: true },
//     image: { type: String }, // Cloudinary URL
//     cloudinary_id: { type: String }, // multer-storage-cloudinary filename
//     totalCopies: { type: Number, default: 1 },
//     availableCopies: { type: Number, default: 1 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Book", bookSchema);

//------------------------------------------------------

// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema(
//   {
//     bookId: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//     },
//     isbn: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       enum: [
//         "Networking",
//         "Web Development",
//         "Algorithms",
//         "Software Engineering",
//         "Calculus",
//         "Data Science",
//         "Cybersecurity",
//         "Operating Systems",
//         "Artificial Intelligence",
//         "Database Systems",
//       ],
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     edition: {
//       type: String,
//       trim: true,
//     },
//     author: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     language: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     publisherName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     totalQuantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     availableQuantity: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     image: {
//       type: String, // Cloudinary image URL
//       required: false,
//     },
//     cloudinary_id: {
//       type: String, // Cloudinary public_id
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Book", bookSchema);

//------------------------------------------------------

// import mongoose from "mongoose";

// const bookSchema = new mongoose.Schema(
//   {
//     bookId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     edition: String,
//     category: String,
//     image: String,
//     cloudinary_id: String,
//     totalCopies: {
//       type: Number,
//       default: 1,
//     },
//     availableCopies: {
//       type: Number,
//       default: 1,
//     },
//   },
//   { timestamps: true }
// );

// const Book = mongoose.model("Book", bookSchema);
// export default Book;

//------------------------------------------------------

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    edition: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    publisherName: {
      type: String,
      trim: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    availableQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    // ✅ Keep both copies & quantities consistent
    totalCopies: {
      type: Number,
      default: 1,
    },
    availableCopies: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

