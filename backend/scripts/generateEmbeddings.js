require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("../models/Book");
const BookAI = require("../models/BookAI");
const { generateEmbedding } = require("../services/aiService");

async function run() {
  await mongoose.connect(process.env.DB_URI);

  const books = await Book.find();

  for (let book of books) {
    const exists = await BookAI.findOne({ bookId: book._id });
    if (exists) continue;

    const text = `
      Title: ${book.title}
      Author: ${book.author}
      Category: ${book.category}
      Edition: ${book.edition}
      Description: ${book.description || ""}
    `;

    const embedding = await generateEmbedding(text);

    await BookAI.create({
      bookId: book._id,
      embedding,
    });

    console.log(`Embedding created for ${book.title}`);
  }

  process.exit();
}

run();
