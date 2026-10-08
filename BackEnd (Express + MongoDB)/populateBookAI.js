// populateBookAI.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");
const BookAI = require("./models/BookAI");
const { generateEmbedding } = require("./services/aiService");
const { fetchGoogleBookByISBN } = require("./services/googleService");

dotenv.config();

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/library";

async function populateBookAI() {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ DB connected");

    const books = await Book.find({});
    if (!books.length) {
      console.log("No books found in Book collection.");
      process.exit();
    }

    for (const book of books) {
      try {
        // Skip if already exists
        const existing = await BookAI.findOne({ bookId: book._id });
        if (existing) {
          console.log(`⏩ Skipped (already exists): ${book.title}`);
          continue;
        }

        console.log(`\n📘 Processing: ${book.title}`);

        // 🔥 1. Fetch Google Data FIRST
        const googleData = await fetchGoogleBookByISBN(book.isbn);

        // 🔥 2. Create FULL semantic text for embedding
        const fullTextForEmbedding = `
Title: ${book.title}
Author: ${book.author}
Category: ${book.category || ""}
Subject: ${book.subject || ""}
Edition: ${book.edition || ""}
Library Description: ${book.description || ""}
Google Description: ${googleData.description || ""}
Google Categories: ${googleData.categories?.join(", ") || ""}
        `.trim();

        // 🔥 3. Generate embedding
        const embedding = await generateEmbedding(fullTextForEmbedding);

        if (!embedding || !Array.isArray(embedding)) {
          console.log("❌ Embedding failed, skipping...");
          continue;
        }

        // 🔥 4. Save to BookAI collection
        await BookAI.create({
          bookId: book._id,
          embedding,
          googleRating: googleData.rating || 0,
          reviewCount: googleData.reviewCount || 0,
          internalPopularity: 0,
        });

        console.log(
          `✅ Added: ${book.title} | Rating: ${googleData.rating} | Reviews: ${googleData.reviewCount}`,
        );
      } catch (innerError) {
        console.error(`❌ Error processing ${book.title}:`, innerError.message);
      }
    }

    console.log("\n🎉 BookAI population complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Fatal Error:", err.message);
    process.exit(1);
  }
}

populateBookAI();
