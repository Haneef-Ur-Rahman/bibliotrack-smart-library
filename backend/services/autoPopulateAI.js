const Book = require("../models/Book");
const BookAI = require("../models/BookAI");
const { generateEmbedding } = require("./aiService");
const { fetchBookByISBN } = require("./googleService");

// Sleep helper function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function autoPopulateBookAI() {
  try {
    console.log("🔄 Auto-populating BookAI...");

    const books = await Book.find({});

    for (const book of books) {
      try {
        // 🔥 Google fetch
        const googleData = await fetchBookByISBN(book.isbn);

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

        const embedding = await generateEmbedding(fullTextForEmbedding);

        if (!embedding) continue;

        // 🔥 UPSERT (Create OR Update automatically)
        await BookAI.findOneAndUpdate(
          { bookId: book._id },
          {
            embedding,
            googleRating: googleData.rating || 0,
            reviewCount: googleData.reviewCount || 0,
          },
          { upsert: true, new: true },
        );

        console.log(`✅ Synced: ${book.title}`);
        console.log(googleData.rating);
        console.log(googleData.reviewCount);

        // ⏱ 1 second delay to prevent 429
        await sleep(1000);
      } catch (err) {
        console.log(`❌ Error syncing ${book.title}: ${err.message}`);
      }
    }

    console.log("🎉 Auto population cycle complete\n");
  } catch (err) {
    console.error("AutoPopulate Error:", err.message);
  }
}

module.exports = { autoPopulateBookAI };
