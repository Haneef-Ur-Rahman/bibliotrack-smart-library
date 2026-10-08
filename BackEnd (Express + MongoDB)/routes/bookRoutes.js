// ----------------- Add multiple books with images -----------------
// router.post(
//   "/add-multiple",
//   protect,
//   upload.array("images", 50),
//   async (req, res) => {
//     try {
//       if (!req.body.books)
//         return res.status(400).json({ message: "Books payload missing" });

//       const books = JSON.parse(req.body.books);
//       const files = req.files || [];

//       if (books.length !== files.length) {
//         return res
//           .status(400)
//           .json({ message: "Each book must have a corresponding image" });
//       }

//       const createdBooks = [];

//       for (let i = 0; i < books.length; i++) {
//         const b = books[i];
//         const f = files[i];
//         console.log("Incoming Book:", b);

//         const newBook = await Book.create({
//           bookId: b.bookId,
//           isbn: b.isbn || "",
//           category: b.category || "",
//           title: b.title,
//           edition: b.edition || "",
//           author: b.author,
//           language: b.language || "",
//           publisherName: b.publisherName || "",
//           totalQuantity: parseInt(b.totalQuantity, 10) || 1,
//           availableQuantity: parseInt(b.availableQuantity, 10) || 1,
//           totalCopies: parseInt(b.totalQuantity, 10) || 1,
//           availableCopies: parseInt(b.availableQuantity, 10) || 1,
//           image: f?.path || "",
//           cloudinary_id: f?.filename || "",
//         });

//         createdBooks.push(newBook);
//       }

//       res.status(200).json({
//         message: "Books added successfully!",
//         count: createdBooks.length,
//         data: createdBooks,
//       });
//     } catch (err) {
//       console.error("Add multiple error:", err);
//       res.status(500).json({ message: "Server error", error: err.message });
//     }
//   }
// );

// ----------------- Add multiple books with images -----------------
// router.post(
//   "/add-multiple",
//   protect,
//   // upload.array("images", 50),
//   upload.fields([
//     { name: "images", maxCount: 50 },
//     { name: "image", maxCount: 50 },
//   ]),

//   async (req, res) => {
//     try {
//       console.log("📥 Received at /add-multiple");
//       console.log("req.body:", req.body);
//       console.log("req.files:", req.files);

//       if (!req.body.books)
//         return res.status(400).json({ message: "Books payload missing" });

//       const books = JSON.parse(req.body.books);
//       const files = req.files || [];

//       if (books.length !== files.length) {
//         return res
//           .status(400)
//           .json({ message: "Each book must have a corresponding image" });
//       }

//       const createdBooks = [];
//       const skippedBooks = [];

//       for (let i = 0; i < books.length; i++) {
//         const b = books[i];
//         const f = files[i];

//         // ✅ Check if book already exists by ISBN
//         const existingBook = await Book.findOne({ isbn: b.isbn });
//         if (existingBook) {
//           console.log(`Book with ISBN ${b.isbn} already exists`);
//           skippedBooks.push({
//             title: b.title,
//             isbn: b.isbn,
//             message: "Book already exists",
//           });
//           continue; // Skip creation
//         }

//         // ✅ Create new book if not duplicate
//         const newBook = await Book.create({
//           bookId: b.bookId,
//           isbn: b.isbn,
//           category: b.category || "",
//           title: b.title,
//           edition: b.edition || "",
//           author: b.author,
//           language: b.language || "",
//           publisherName: b.publisherName || "",
//           totalQuantity: parseInt(b.totalQuantity, 10) || 1,
//           availableQuantity: parseInt(b.availableQuantity, 10) || 1,
//           totalCopies: parseInt(b.totalQuantity, 10) || 1,
//           availableCopies: parseInt(b.availableQuantity, 10) || 1,
//           image: f?.path || "",
//           cloudinary_id: f?.filename || "",
//         });

//         createdBooks.push(newBook);
//       }

//       // ✅ Response message summary
//       let message = "Books added successfully!";
//       if (skippedBooks.length > 0 && createdBooks.length > 0) {
//         message = `Some books were added, and ${skippedBooks.length} were skipped because they already exist.`;
//       } else if (skippedBooks.length > 0 && createdBooks.length === 0) {
//         message = "All provided books already exist.";
//       }

//       res.status(200).json({
//         success: true,
//         message,
//         addedCount: createdBooks.length,
//         skippedCount: skippedBooks.length,
//         skippedBooks,
//         data: createdBooks,
//       });
//     } catch (err) {
//       console.error("Add multiple error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Server error while adding books",
//         error: err.message,
//       });
//     }
//   }
// );
//----------------------------------------------------------------------

// routes/bookRoutes.js
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const mongoose = require("mongoose");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const { v2: cloudinary } = require("cloudinary");
// const Book = require("../models/Book");
// const IssuedBook = require("../models/IssuedBook");
// const Reservation = require("../models/Reservation");
// const { protect } = require("../middleware/authMiddleware"); // reuse your protect middleware

// // Cloudinary config (ensure env vars set)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "book_images",
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });
// const upload = multer({ storage });
// router.post(
//   "/add-multiple",
//   protect,
//   upload.fields([
//     { name: "images", maxCount: 50 },
//     { name: "image", maxCount: 50 },
//   ]),
//   async (req, res) => {
//     try {
//       console.log("📦 req.body:", req.body);
//       console.log("📷 req.files:", req.files);
//       console.log(
//         "🧾 Keys in req.files:",
//         req.files ? Object.keys(req.files) : "No files received"
//       );

//       if (!req.body.books)
//         return res.status(400).json({ message: "Books payload missing" });

//       const books = JSON.parse(req.body.books);
//       const files = req.files?.images || req.files?.image || [];

//       if (books.length !== files.length) {
//         return res
//           .status(400)
//           .json({ message: "Each book must have a corresponding image" });
//       }

//       const createdBooks = [];
//       const skippedBooks = [];

//       for (let i = 0; i < books.length; i++) {
//         const b = books[i];
//         const f = files[i];

//         // ✅ Check if book already exists by ISBN
//         const existingBook = await Book.findOne({ isbn: b.isbn });
//         if (existingBook) {
//           console.log(`Book with ISBN ${b.isbn} already exists`);
//           skippedBooks.push({
//             title: b.title,
//             isbn: b.isbn,
//             message: "Book already exists",
//           });
//           continue; // Skip creation
//         }

//         // ✅ Create new book
//         const newBook = await Book.create({
//           bookId: b.bookId,
//           isbn: b.isbn,
//           category: b.category || "",
//           title: b.title,
//           edition: b.edition || "",
//           author: b.author,
//           language: b.language || "",
//           publisherName: b.publisherName || "",
//           totalQuantity: parseInt(b.totalQuantity, 10) || 1,
//           availableQuantity: parseInt(b.availableQuantity, 10) || 1,
//           totalCopies: parseInt(b.totalQuantity, 10) || 1,
//           availableCopies: parseInt(b.availableQuantity, 10) || 1,
//           image: f?.path || "",
//           cloudinary_id: f?.filename || "",
//         });

//         createdBooks.push(newBook);
//       }

//       // ✅ Final response
//       let message = "Books added successfully!";
//       if (skippedBooks.length > 0 && createdBooks.length > 0) {
//         message = `Some books were added, and ${skippedBooks.length} were skipped because they already exist.`;
//       } else if (skippedBooks.length > 0 && createdBooks.length === 0) {
//         message = "All provided books already exist.";
//       }

//       res.status(200).json({
//         success: true,
//         message,
//         addedCount: createdBooks.length,
//         skippedCount: skippedBooks.length,
//         skippedBooks,
//         data: createdBooks,
//       });
//     } catch (err) {
//       console.error("Add multiple error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Server error while adding books",
//         error: err.message,
//       });
//     }
//   }
// );

// //--------------------------------

// // ----------------- List books -----------------
// router.get("/", async (req, res) => {
//   try {
//     const books = await Book.find().sort({ createdAt: -1 });
//     res.json({ books });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// // ----------------- Issue book -----------------
// router.post("/issue/:bookId", protect, async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const bookId = req.params.bookId;

//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: "Book not found" });

//     // Check if student already has an active issued copy of this book (optional)
//     const existingIssued = await IssuedBook.findOne({
//       studentId,
//       bookId,
//       returnDate: null,
//     });
//     if (existingIssued) {
//       return res
//         .status(400)
//         .json({ message: "You already have this book issued" });
//     }

//     if (book.availableCopies > 0) {
//       // issue immediately
//       const issued = await IssuedBook.create({
//         studentId,
//         bookId,
//         issueDate: new Date(),
//         // set dueDate if you want: new Date(Date.now() + 14*24*3600*1000)
//       });

//       book.availableCopies = book.availableCopies - 1;
//       await book.save();

//       return res.json({ message: "Book issued successfully", issued });
//     } else {
//       // create reservation (if not already reserved by same student)
//       const alreadyReserved = await Reservation.findOne({
//         studentId,
//         bookId,
//         status: "pending",
//       });
//       if (alreadyReserved) {
//         return res
//           .status(400)
//           .json({ message: "You already reserved this book" });
//       }

//       const reservation = await Reservation.create({
//         studentId,
//         bookId,
//       });

//       return res.json({
//         message: "No copies available. Book reserved.",
//         reservation,
//       });
//     }
//   } catch (err) {
//     console.error("Issue error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ----------------- Admin: Fetch ALL issued books (with student & book info) -----------------
// router.get("/admin/issued-books", protect, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     const issuedBooks = await IssuedBook.find()
//       .populate(
//         "studentId",
//         "firstName lastName email username degree program rollNo batchNo"
//       )
//       .populate("bookId", "title author isbn")
//       .sort({ issueDate: 1 }) // ⏰ Oldest issued first
//       .lean();

//     res.json({ success: true, issuedBooks });
//   } catch (error) {
//     console.error("Admin issued books error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ----------------- Return book -----------------
// // Provide issuedId in body or find by student & book where returnDate=null
// router.post("/return/:issuedId", protect, async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const issuedId = req.params.issuedId;

//     const issued = await IssuedBook.findById(issuedId);
//     if (!issued)
//       return res.status(404).json({ message: "Issued record not found" });
//     if (issued.returnDate)
//       return res.status(400).json({ message: "Already returned" });

//     // Only the student who issued or admin can return
//     if (
//       issued.studentId.toString() !== studentId &&
//       req.user.role !== "admin"
//     ) {
//       return res.status(403).json({ message: "Not authorized to return this" });
//     }

//     issued.returnDate = new Date();
//     await issued.save();

//     // increment availableCopies
//     const book = await Book.findById(issued.bookId);
//     book.availableCopies = (book.availableCopies || 0) + 1;
//     await book.save();

//     // Check reservations for this book (FIFO)
//     const nextRes = await Reservation.findOne({
//       bookId: book._id,
//       status: "pending",
//     }).sort({ reservationDate: 1 });

//     if (nextRes) {
//       // issue to reserved student
//       const newIssued = await IssuedBook.create({
//         studentId: nextRes.studentId,
//         bookId: book._id,
//         issueDate: new Date(),
//       });

//       // mark reservation as issued
//       nextRes.status = "issued";
//       await nextRes.save();

//       // reduce availableCopies again because we immediately issued
//       book.availableCopies = book.availableCopies - 1;
//       await book.save();

//       return res.json({
//         message: "Book returned. Reservation found and issued to next student.",
//         returned: issued,
//         autoIssued: newIssued,
//         reservation: nextRes,
//       });
//     }

//     res.json({ message: "Book returned successfully", returned: issued });
//   } catch (err) {
//     console.error("Return error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ----------------- Fetch issued books for logged-in student -----------------
// router.get("/student/issued-books", protect, async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const issuedBooks = await IssuedBook.find({
//       studentId,
//       returnDate: null, // only currently issued
//     }).lean();

//     res.json({ success: true, issuedBooks });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ----------------- Fetch reserved books for logged-in student -----------------
// router.get("/student/reserved-books", protect, async (req, res) => {
//   try {
//     const reservations = await Reservation.find({
//       studentId: req.user.userId,
//       status: "pending",
//     }).populate("bookId");

//     res.json({ success: true, reservations });
//   } catch (err) {
//     console.error("Fetch reserved books error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ----------------- Update book -----------------
// router.put("/update/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json({
//       message: "Book updated successfully!",
//       book: updatedBook,
//     });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Optional: Cancel reservation
// router.post("/cancel-reservation/:reservationId", protect, async (req, res) => {
//   try {
//     const reservation = await Reservation.findById(req.params.reservationId);
//     if (!reservation)
//       return res.status(404).json({ message: "Reservation not found" });
//     if (
//       reservation.studentId.toString() !== req.user.userId &&
//       req.user.role !== "admin"
//     )
//       return res.status(403).json({ message: "Not authorized" });

//     reservation.status = "cancelled";
//     await reservation.save();
//     res.json({ message: "Reservation cancelled" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/recent", async (req, res) => {
//   try {
//     const books = await Book.find({})
//       .sort({ createdAt: -1 }) // recent first
//       .limit(10)
//       .lean();

//     if (!books) return res.status(404).json({ message: "No books found" });

//     console.log("Fetched recent books:", books);
//     res.json({ success: true, count: books.length, books });
//   } catch (error) {
//     console.error("Error fetching recent books:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // GET single book by ID (must be last)
// router.get("/:id", async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json({ book });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ----------------- Delete book -----------------
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json({ message: "Book deleted successfully!" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;

//---------------------------------------------------------------

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

const Book = require("../models/Book");
const IssuedBook = require("../models/IssuedBook");
const Reservation = require("../models/Reservation");
const { protect } = require("../middleware/authMiddleware");
const autoIssueIfReserved = require("../utils/autoIssue");
const BookRequest = require("../models/BookRequest");
const { Member } = require("../models/user");
const {
  sendBookIssuedEmail,
  sendBookReturnedEmail,
  sendBookReservedEmail,
  sendBookRequestUpdateEmail,
} = require("../services/emailService");

// ================== CLOUDINARY CONFIG ==================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book_images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// ======================================================
// ================== ADD MULTIPLE BOOKS =================
// ======================================================
router.post(
  "/add-multiple",
  protect,
  upload.fields([
    { name: "images", maxCount: 50 },
    { name: "image", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      if (!req.body.books) {
        return res.status(400).json({ message: "Books payload missing" });
      }

      const books = JSON.parse(req.body.books);
      const files = req.files?.images || req.files?.image || [];

      if (books.length !== files.length) {
        return res
          .status(400)
          .json({ message: "Each book must have a corresponding image" });
      }

      const createdBooks = [];
      const skippedBooks = [];

      for (let i = 0; i < books.length; i++) {
        const b = books[i];
        const f = files[i];

        const existingBook = await Book.findOne({ isbn: b.isbn });
        if (existingBook) {
          skippedBooks.push({
            title: b.title,
            isbn: b.isbn,
            message: "Book already exists",
          });
          continue;
        }

        const newBook = await Book.create({
          bookId: b.bookId,
          isbn: b.isbn,
          category: b.category || "",
          title: b.title,
          edition: b.edition || "",
          author: b.author,
          language: b.language || "",
          publisherName: b.publisherName || "",
          totalQuantity: Number(b.totalQuantity) || 1,
          availableQuantity: Number(b.availableQuantity) || 1,
          totalCopies: Number(b.totalQuantity) || 1,
          availableCopies: Number(b.availableQuantity) || 1,
          image: f?.path || "",
          cloudinary_id: f?.filename || "",
        });

        createdBooks.push(newBook);
      }

      res.json({
        success: true,
        addedCount: createdBooks.length,
        skippedCount: skippedBooks.length,
        skippedBooks,
        data: createdBooks,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
);

// ======================================================
// ================== LIST ALL BOOKS =====================
// ======================================================
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ books });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// ================== RECENT BOOKS =======================
// ======================================================
router.get("/recent", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, books });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// ================== ADMIN ROUTES =======================
// ======================================================
router.get("/admin/issued-books", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const issuedBooks = await IssuedBook.find()
      .populate(
        "studentId",
        "firstName lastName email username cnic degree program rollNo batchNo",
      )

      .populate("bookId", "title author isbn")
      .sort({ issueDate: 1 });

    res.json({ success: true, issuedBooks });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// ================== STUDENT ROUTES =====================
// ======================================================
router.get("/student/issued-books", protect, async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find({
      studentId: req.user.userId,
      returnDate: null,
    }).populate("bookId");

    res.json({ success: true, issuedBooks });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/student/reserved-books", protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      studentId: req.user.userId,
      status: "pending",
    }).populate("bookId");

    res.json({ success: true, reservations });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// CANCEL RESERVATION
router.post("/cancel-reservation/:reservationId", protect, async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Ensure only the student who made reservation can cancel
    if (reservation.studentId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this reservation" });
    }

    // Only pending reservations can be canceled
    if (reservation.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending reservations can be canceled" });
    }

    // Delete reservation
    await reservation.deleteOne();

    res.json({ message: "Reservation canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// ================== ISSUE BOOK =========================
// ======================================================
// router.post("/issue/:bookId", protect, async (req, res) => {
//   try {
// const studentId = req.user.userId;
// const book = await Book.findById(req.params.bookId);

//     if (!book) return res.status(404).json({ message: "Book not found" });

//     const alreadyIssued = await IssuedBook.findOne({
//       studentId,
//       bookId: book._id,
//       returnDate: null,
//     });

//     if (alreadyIssued) {
//       return res.status(400).json({ message: "Book already issued to you" });
//     }

//     if (book.availableCopies > 0) {
//       const issued = await IssuedBook.create({
//         studentId,
//         bookId: book._id,
//       });

//       book.availableCopies--;
//       await book.save();

//       return res.json({ message: "Book issued", issued });
//     }

//     const reservation = await Reservation.create({
//       studentId,
//       bookId: book._id,
//     });

//     res.json({ message: "Book reserved", reservation });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// });
//-----------------------------------------------------------------------------------------
// router.post("/issue/:bookId", protect, async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const bookId = req.params.bookId; // ✅ get bookId from params

//     // Find book
//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: "Book not found" });

//     // Check if already issued
//     const alreadyIssued = await IssuedBook.findOne({
//       studentId,
//       bookId: book._id,
//       returnDate: null,
//     });
//     if (alreadyIssued) {
//       return res.status(400).json({ message: "Book already issued to you" });
//     }

//     // Issue book if available
//     if (book.availableCopies > 0) {
//       const issued = await IssuedBook.create({
//         studentId,
//         bookId: book._id,
//       });

//       // Decrement available copies
//       book.availableCopies--;
//       await book.save();

//       return res.json({ message: "Book issued", issued });
//     }

//     // Else reserve book
//     const reservation = await Reservation.create({
//       studentId,
//       bookId: book._id,
//     });

//     return res.json({ message: "Book reserved", reservation });
//   } catch (err) {
//     console.error("Issue/Reserve error:", err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// });
//-----------------------------------------------------------------------------------------
// router.post("/issue/:bookId", protect, async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const bookId = req.params.bookId;

//     // Find book
//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: "Book not found" });

//     // Check if already issued
//     const alreadyIssued = await IssuedBook.findOne({
//       studentId,
//       bookId: book._id,
//       returnDate: null,
//     });
//     if (alreadyIssued) {
//       return res.status(400).json({ message: "Book already issued to you" });
//     }

//     // Issue book if available
//     if (book.availableCopies > 0) {
//       // 1. Calculate the due date (e.g., 14 days from now)
//       const currentDate = new Date();
//       const dueDate = new Date();
//       // dueDate.setDate(currentDate.getDate() + 14);
//       dueDate.setDate(currentDate.getDate() + 1);

//       // 2. Create the new IssuedBook record, INCLUDING the dates
//       const issued = await IssuedBook.create({
//         studentId,
//         bookId: book._id,
//         issueDate: currentDate, // <-- Good practice to add this
//         dueDate: dueDate, // <-- THIS IS THE FIX
//       });
//       const student = await Member.findById(studentId);

//       // Decrement available copies
//       book.availableCopies--;
//       await book.save();
//       try {
//         await sendBookIssuedEmail({
//           email: student.email,
//           firstName: student.firstName,
//           lastName: student.lastName,
//           bookTitle: book.title,
//           dueDate,
//         });
//       } catch (err) {
//         console.log("Issue email failed:", err.message);
//       }
//       return res.json({ message: "Book issued", issued });
//     }

//     // Else reserve book
//     const reservation = await Reservation.create({
//       studentId,
//       bookId: book._id,
//     });
//     const student = await Member.findById(studentId);

//     try {
//       await sendBookReservedEmail({
//         email: student.email,
//         firstName: student.firstName,
//         lastName: student.lastName,
//         bookTitle: book.title,
//       });
//     } catch (err) {
//       console.log("Reserve email failed:", err.message);
//     }

//     return res.json({ message: "Book reserved", reservation });
//   } catch (err) {
//     console.error("Issue/Reserve error:", err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// });
/////////////////////////////////////////////////////////////////////////
router.post("/issue/:bookId", protect, async (req, res) => {
  try {
    const studentId = req.user.userId;
    const bookId = req.params.bookId;

    // 1️⃣ Find book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // 2️⃣ Check if already issued
    const alreadyIssued = await IssuedBook.findOne({
      studentId,
      bookId: book._id,
      returnDate: null,
    });
    if (alreadyIssued) {
      return res.status(400).json({ message: "Book already issued to you" });
    }

    // 3️⃣ Fetch student once
    const student = await Member.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 4️⃣ Issue if available
    if (book.availableCopies > 0) {
      const currentDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(currentDate.getDate() + 1);

      // Create issued record
      const issued = await IssuedBook.create({
        studentId,
        bookId: book._id,
        issueDate: currentDate,
        dueDate,
      });

      // Decrement available copies
      book.availableCopies--;
      await book.save();

      // Send email (non-blocking)
      try {
        await sendBookIssuedEmail({
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          bookTitle: book.title,
          dueDate,
        });
      } catch (err) {
        console.log("Issue email failed:", err.message);
      }

      return res.json({ message: "Book issued", issued });
    }

    // 5️⃣ Else, reserve book
    const reservation = await Reservation.create({
      studentId,
      bookId: book._id,
    });

    try {
      await sendBookReservedEmail({
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        bookTitle: book.title,
      });
    } catch (err) {
      console.log("Reserve email failed:", err.message);
    }

    return res.json({ message: "Book reserved", reservation });
  } catch (err) {
    console.error("Issue/Reserve error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// ======================================================
// ================== RETURN BOOK ========================
// ======================================================
// router.post("/return/:issuedId", protect, async (req, res) => {
//   try {
//     const issued = await IssuedBook.findById(req.params.issuedId);
//     if (!issued || issued.returnDate) {
//       return res.status(400).json({ message: "Invalid issued record" });
//     }

//     if (
//       issued.studentId.toString() !== req.user.userId &&
//       req.user.role !== "admin"
//     ) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     issued.returnDate = new Date();
//     await issued.save();

//     const book = await Book.findById(issued.bookId);
//     book.availableCopies++;
//     await book.save();

//     res.json({ message: "Book returned successfully" });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// });
//////////////////////////////////////////////////////////////////////////////////
// router.post("/return/:issuedId", protect, async (req, res) => {
//   const issued = await IssuedBook.findById(req.params.issuedId);
//   if (!issued || issued.returnDate) {
//     return res.status(400).json({ message: "Invalid issued record" });
//   }

//   issued.returnDate = new Date();
//   await issued.save();

//   const book = await Book.findById(issued.bookId);

//   // ✅ check oldest pending reservation
//   const nextReservation = await Reservation.findOne({
//     bookId: book._id,
//     status: "pending",
//   }).sort({ reservationDate: 1 }); // FIFO

//   if (nextReservation) {
//     // auto issue
//     await IssuedBook.create({
//       studentId: nextReservation.studentId,
//       bookId: book._id,
//     });

//     nextReservation.status = "issued";
//     await nextReservation.save();

//     return res.json({
//       message: "Book returned & auto-issued to reserved student",
//     });
//   }

//   // no reservation → increase copies
//   book.availableCopies++;
//   await book.save();

//   res.json({ message: "Book returned successfully" });
// });

// // ======================================================
// // ================== UPDATE BOOK ========================
// // ======================================================
// router.put("/update/:id", async (req, res) => {
//   try {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!book) return res.status(404).json({ message: "Book not found" });

//     res.json({ message: "Book updated", book });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// ======================================================
// ================== UPDATE BOOK (CORRECTED) ============
// ======================================================
router.put("/update/:id", protect, async (req, res) => {
  try {
    // 1. Find the book BEFORE the update to get its original state
    const originalBook = await Book.findById(req.params.id);
    if (!originalBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2. Perform the update
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure model validation rules are applied
    });

    // 3. Check if the book's availability changed from 0 to > 0
    if (originalBook.availableCopies === 0 && updatedBook.availableCopies > 0) {
      console.log(
        `Book ${updatedBook.title} is now available. Checking for reservations...`,
      );
      // 4. If so, trigger the auto-issue logic
      await autoIssueIfReserved(updatedBook._id);
    }

    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////

// router.post("/return/:issuedId", protect, async (req, res) => {
//   try {
//     const issued = await IssuedBook.findById(req.params.issuedId);
//     if (!issued || issued.returnDate) {
//       return res.status(400).json({ message: "Invalid issued record" });
//     }

//     issued.returnDate = new Date();
//     await issued.save();

//     const book = await Book.findById(issued.bookId);
//     book.availableCopies++;
//     await book.save();

//     // 🔥 Reusable auto-issue function
//     await autoIssueIfReserved(book._id);
//     try {
//       await sendBookReturnedEmail({
//         email: student.email,
//         firstName: student.firstName,
//         lastName: student.lastName,
//         bookTitle: book.title,
//       });
//     } catch (err) {
//       console.log("Return email failed:", err.message);
//     }

//     res.json({ message: "Book returned & processed successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });
////////////////////////////////////////////////////////////////////////
// router.post("/return/:issuedId", protect, async (req, res) => {
//   try {
//     const issued = await IssuedBook.findById(req.params.issuedId);
//     if (!issued || issued.returnDate) {
//       return res.status(400).json({ message: "Invalid issued record" });
//     }

//     issued.returnDate = new Date();
//     await issued.save();

//     const book = await Book.findById(issued.bookId);
//     book.availableCopies++;
//     await book.save();

//     await autoIssueIfReserved(book._id);

//     // ✅ FETCH STUDENT HERE
//     const student = await Member.findById(issued.studentId);

//     try {
//       await sendBookReturnedEmail({
//         email: student.email,
//         firstName: student.firstName,
//         lastName: student.lastName,
//         bookTitle: book.title,
//       });
//     } catch (err) {
//       console.log("Return email failed:", err.message);
//     }

//     res.json({ message: "Book returned & processed successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });
////////////////////////////////////////////////////////////////////
router.post("/return/:issuedId", protect, async (req, res) => {
  try {
    const issuedId = req.params.issuedId;

    // 1️⃣ Find issued record
    const issued = await IssuedBook.findById(issuedId);
    if (!issued || issued.returnDate) {
      return res.status(400).json({ message: "Invalid issued record" });
    }

    // 2️⃣ Find book
    const book = await Book.findById(issued.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 3️⃣ Find student
    const student = await Member.findById(issued.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 4️⃣ Mark as returned
    issued.returnDate = new Date();
    await issued.save();

    // 5️⃣ Increase available copies
    book.availableCopies++;
    await book.save();

    // 6️⃣ Auto-issue to next reserved student (if any)
    await autoIssueIfReserved(book._id);

    // 7️⃣ Send email (non-blocking safety)
    try {
      await sendBookReturnedEmail({
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        bookTitle: book.title,
      });
    } catch (err) {
      console.log("Return email failed:", err.message);
    }

    return res.json({
      success: true,
      message: "Book returned & processed successfully",
    });

  } catch (err) {
    console.error("Return error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// ======================================================
// ================== DELETE BOOK ========================
// ======================================================
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// ================= STUDENT: CREATE BOOK REQUEST =================
// ======================================================
router.post("/request-book", protect, async (req, res) => {
  try {
    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Changed from req.user.id to req.user.userId
    const student = await Member.findById(req.user.userId);
    console.log("Student fetched:", student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { bookTitle, author, edition, category, isbn } = req.body;

    if (!bookTitle || !author) {
      return res
        .status(400)
        .json({ message: "Book title and author are required" });
    }

    const bookRequest = await BookRequest.create({
      studentId: student._id,

      // ✅ schema-matched student fields
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      cnic: student.cnic,
      degree: student.degree,
      program: student.program,
      batchNo: student.batchNo,
      rollNo: student.rollNo,

      // 📘 book fields
      bookTitle,
      author,
      edition: edition || "",
      category: category || "",
      isbn: isbn || "",
    });
    try {
      await sendBookRequestSubmittedEmail({
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        bookTitle,
      });
    } catch (err) {
      console.log("Request email failed:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Book request submitted successfully",
      bookRequest,
    });
  } catch (err) {
    console.error("Book request error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ======================================================
// ================= ADMIN: LIST ALL BOOK REQUESTS =================
// ======================================================
router.get("/admin/requests", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const requests = await BookRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ======================================================
// ================= ADMIN: UPDATE REQUEST (APPROVE / REJECT + RESPONSE) =================
// ======================================================

router.put("/admin/request/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const { status, adminNote } = req.body;

    const request = await BookRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (status) request.status = status;
    if (adminNote) request.adminNote = adminNote;

    await request.save();
    try {
      await sendBookRequestUpdateEmail({
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        bookTitle: request.bookTitle,
        status: request.status,
        adminNote: request.adminNote,
      });
    } catch (err) {
      console.log("Request update email failed:", err.message);
    }

    res.json({ success: true, message: "Request updated", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================================================
// ================= ADMIN: DELETE REQUEST =================
// ======================================================

router.delete("/admin/request/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const request = await BookRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ success: true, message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// ======================================================
// ================= STUDENT: GET THEIR OWN REQUESTS =================
// ======================================================
// TEMPORARY DEBUGGING VERSION
// In backend/routes/books.js

// In backend/routes/books.js

router.get("/my-requests", protect, async (req, res) => {
  // --- THIS IS THE DEBUGGING LINE ---
  console.log(">>> /api/books/my-requests route was hit!");
  console.log(">>> req.user is:", req.user);
  // --- END DEBUGGING LINE ---

  try {
    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requests = await BookRequest.find({
      studentId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    // This line will print the specific error
    console.error(">>> CATCH BLOCK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ======================================================
// ================== GET SINGLE BOOK (LAST) =============
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ book });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
