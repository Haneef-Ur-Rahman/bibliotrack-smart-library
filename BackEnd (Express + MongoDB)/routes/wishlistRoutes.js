const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // ✅ make sure this is imported
const Wishlist = require("../models/Wishlist");
const Book = require("../models/Book");
const { protect } = require("../middleware/authMiddleware");

// ----------------- GET student's wishlist -----------------
router.get("/", protect, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ studentId: req.user.userId });

    const wishlist = await Promise.all(
      wishlistItems.map(async (item) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(item.bookId)) return null;

          const book = await Book.findById(item.bookId).select(
            "title author isbn category image edition publisherName"
          );

          if (!book) return null;
          return {
            _id: item._id,
            bookId: book._id,
            addedAt: item.addedAt,
            bookDetails: book,
          };
        } catch (err) {
          console.error("Error loading book:", err);
          return null;
        }
      })
    );

    res.status(200).json({ wishlist: wishlist.filter(Boolean) });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch wishlist", error: error.message });
  }
});

// ----------------- POST add/remove wishlist -----------------
router.post("/", protect, async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { bookId, action } = req.body;

    if (!bookId || !action)
      return res.status(400).json({ message: "bookId and action required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (action === "add") {
      const existing = await Wishlist.findOne({ studentId, bookId });
      if (existing)
        return res.status(400).json({ message: "Book already in wishlist" });

      const wishlistItem = await Wishlist.create({ studentId, bookId });
      return res
        .status(200)
        .json({ message: "Book added to wishlist", wishlistItem });
    } else if (action === "remove") {
      const removed = await Wishlist.findOneAndDelete({ studentId, bookId });
      if (!removed)
        return res.status(404).json({ message: "Book not found in wishlist" });

      return res.status(200).json({ message: "Book removed from wishlist" });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    console.error("Wishlist action error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
