const axios = require("axios");
const Book = require("../models/Book");
const { recommendBooks } = require("../services/recommendationService");
let lastRecommendations = [];
const userMemory = new Map();
const API_URL = import.meta.env.VITE_API_URL;

async function chatbot(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;
    const { message } = req.body;

    const query = message.toLowerCase().trim();

    const token = req.headers.authorization?.split(" ")[1];

    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    /* ======================
       ISSUED / FINE CHECK
    ====================== */

    if (query.includes("fine") || query.includes("issued")) {
    const issuedRes = await axios.get(
  `${API_URL}/api/books/student/issued-books`,
  axiosConfig,
);

      const issuedBooks = issuedRes.data.issuedBooks || [];

      if (query.includes("issued")) {
        return res.json({
          reply: `📚 You have issued ${issuedBooks.length} book(s).`,
        });
      }

      if (query.includes("fine")) {
        const today = new Date();
        let total = 0;

        issuedBooks.forEach((book) => {
          const dueDate = new Date(book.dueDate);

          const daysOverdue = Math.ceil(
            (today - dueDate) / (1000 * 60 * 60 * 24),
          );

          if (daysOverdue > 0) {
            total += daysOverdue * 100;
          }
        });

        return res.json({
          reply: `💰 Your current fine is Rs. ${total}`,
        });
      }
    }

    /* ======================
       RESERVED BOOKS
    ====================== */

   if (query.includes("reserved")) {
  const reservedRes = await axios.get(
    `${API_URL}/api/books/student/reserved-books`,
    axiosConfig,
  );

      const reservedBooks = reservedRes.data.reservations || [];

      return res.json({
        reply: `📖 You have reserved ${reservedBooks.length} book(s).`,
      });
    }

    /* ======================
       AI RECOMMENDATION
    ====================== */

    if (query.includes("recommend") || query.includes("suggest")) {
      const books = await recommendBooks(query);

      // 🧠 Save memory per user
      userMemory.set(userId, books);

      // Create a formatted reply with book recommendations
      let reply = "📚 Here are some books I recommend:\n\n";

      if (books.length === 0) {
        reply = "Sorry, I couldn't find any books matching your query.";
      } else {
        books.forEach((book, index) => {
          reply += `${index + 1}. ${book.book.title} by ${book.book.author}\n`;
        });
      }

      return res.json({
        type: "recommendation",
        books,
        reply, // Add this reply field
      });
    }

    const lastRecommendations = userMemory.get(userId) || [];

    /* ======================
       NORMAL SEARCH
    ====================== */

    const books = await Book.find({});

    const matchedBooks = books.filter((b) => {
      return (
        b.title?.toLowerCase().includes(query) ||
        b.author?.toLowerCase().includes(query) ||
        b.subject?.toLowerCase().includes(query)
      );
    });

    const numberMatch = query.match(/(first|second|third|1|2|3)/);

    if (numberMatch && lastRecommendations.length > 0) {
      let index = 0;

      if (query.includes("second") || query.includes("2")) index = 1;
      if (query.includes("third") || query.includes("3")) index = 2;

      const selectedBook = lastRecommendations[index];

      if (!selectedBook) {
        return res.json({
          reply: "I couldn't find that book.",
        });
      }

      if (query.includes("author")) {
        return res.json({
          reply: `✍ Author: ${selectedBook.book.author}`,
        });
      }

      if (query.includes("available")) {
        const status =
          selectedBook.book.availableCopies > 0 ? "Available" : "Unavailable";

        return res.json({
          reply: `📚 ${selectedBook.book.title} is ${status}`,
        });
      }

      return res.json({
        reply: `📖 ${selectedBook.book.title} by ${selectedBook.book.author}`,
      });
    }

    return res.json({
      reply:
        "Sorry, I can only answer library-related questions.\n\n" +
        "However, I can assist you with the following:\n" +
        "• Fine details\n" +
        "• Issued books\n" +
        "• Reserved books\n" +
        "• AI recommendations\n" +
        "• Book search",
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      reply: "Internal server error",
    });
  }
}

module.exports = { chatbot };
