// const BookAI = require("../models/BookAI");
// const cosineSimilarity = require("../utils/cosineSimilarity");
// const { generateEmbedding } = require("./aiService");

// async function recommendBooks(query) {
//   const queryEmbedding = await generateEmbedding(query);

//   const books = await BookAI.find().populate("bookId");

//   const scoredBooks = books.map((b) => {
//     const score = cosineSimilarity(queryEmbedding, b.embedding);

//     return {
//       book: b.bookId,
//       score,
//     };
//   });

//   const filtered = scoredBooks.filter((b) => b.score > 0.75);

//   filtered.sort((a, b) => b.score - a.score);

//   return filtered.slice(0, 5);
// }

// module.exports = { recommendBooks };

//-----------------------------------------------------------

const BookAI = require("../models/BookAI");
const { generateEmbedding } = require("./aiService");
const cosineSimilarity = require("../utils/cosineSimilarity");

async function recommendBooks(userQuery) {
  try {
    // 1️⃣ Generate embedding for user query
    const queryEmbedding = await generateEmbedding(userQuery);

    if (!queryEmbedding) {
      return [];
    }

    // 2️⃣ Fetch all books with embeddings
    const booksAI = await BookAI.find().populate("bookId");

    const results = [];

    for (let book of booksAI) {
      if (!book.embedding) continue;

      const similarity = cosineSimilarity(queryEmbedding, book.embedding);

      results.push({
        book: book.bookId,
        similarity,
      });
    }

    // 3️⃣ Sort by similarity
    results.sort((a, b) => b.similarity - a.similarity);

    // 4️⃣ Return top 3 books
    return results.slice(0, 3);
  } catch (error) {
    console.error("Recommendation Error:", error);
    return [];
  }
}

module.exports = { recommendBooks };
