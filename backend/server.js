// At the top of server.js
// const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // ✅ Load environment variables immediately
const express = require("express");
const { transporter } = require("./services/emailService.js"); // ✅ Import transporter
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const connectDB = require("./config/db");
require("./utils/lateFeeCron");
const userRoutes = require("./routes/userRoutes");
// const authroute = require("./routes/authRoute");
const authRoute = require("./routes/authRoute");
const {
  protect,
  adminOnly,
  memberOnly,
} = require("./middleware/authMiddleware"); //---------------------------------------------------
const fineRoutes = require("./routes/fine.routes.js");

//---------------------------------------------------

const axios = require("axios");
const Book = require("./models/Book"); // correct path dena
const Issue = require("./models/IssuedBook"); // correct path dena
const Reservation = require("./models/Reservation"); // correct path dena
const Payment = require("./models/Payment"); // correct path dena
const BookAI = require("./models/BookAI"); // <-- And this for recommendations
const { generateEmbedding } = require("./services/aiService");
const cosineSimilarity = require("./utils/cosineSimilarity");
const mongoose = require("mongoose"); // ✅ Add this
const bookRoutes = require("./routes/bookRoutes");
const cron = require("node-cron");
const { autoPopulateBookAI } = require("./services/autoPopulateAI");
const chatbotRoutes = require("./routes/chatbotRoutes");
// ✅ IMPORT YOUR DATABASE MODELS

//dotenv.config(); // ✅ ek hi jagah rakho
const app = express();
app.use(express.json());

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "https://bibliotrack-smart-library-8tc1hidj8-haneef-ur-rahmans-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dejk8p0yj",
  api_key: "724228497597983",
  api_secret: "U532YxPU7EOmuYcUC9ZGoJXjh14",
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NODEJS_EXPRESS_API_Series",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Multer middleware
const upload = multer({ storage: storage });

// Schema and model for storing file details
const fileSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  imageUrl: String,
});

// Model
const file = mongoose.model("cloudinary", fileSchema);

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("➡️ Incoming file:", req.file); // Debug log
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
    folder: "NODEJS_EXPRESS_API_Series",
  });

  const savetoDB = await file.create({
    filename: req.file.originalname,
    public_id: req.file.filename, // multer-storage-cloudinary ka unique id
    imageUrl: req.file.path,
  });

  console.log("Full Cloudinary Response:", cloudinaryResponse, savetoDB);

  res.json({
    message: "File uploaded successfully",
    cloudinary: cloudinaryResponse,
  });
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/auth", authRoute);
app.use("/api/books", bookRoutes);
app.use("/api/fines", fineRoutes);
app.use("/api", chatbotRoutes); // ✅ Add chatbot routes

// ======================= PROFESSIONAL CHATBOT ROUTES ============================

// let lastQueriedBookGlobal = null;

// app.post("/api/chatbot", protect, memberOnly, async (req, res) => {
//   try {
//     const { message } = req.body;
//     // const query = message.toLowerCase().trim();
//     const query = message.toLowerCase().trim();

//     // Get the token from the incoming request to use for internal API calls
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ reply: "Authentication error." });
//     }

//     const axiosConfig = {
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     /* =========================
//        USER PERSONAL DATA CHECK (Using API calls)
//     ========================== */

//     // 💰 Fine Check & 📚 Issued Books (Both use the same API)
//     if (query.includes("fine") || query.includes("issued")) {
//       // Fetch issued books from the existing API
//       const issuedRes = await axios.get(
//         "http://localhost:3002/api/books/student/issued-books",
//         axiosConfig,
//       );
//       const issuedBooks = issuedRes.data.issuedBooks || [];

//       // If the query was for issued books, return the count
//       if (query.includes("issued")) {
//         return res.json({
//           reply: `📚 You have issued ${issuedBooks.length} book(s).`,
//         });
//       }

//       // If the query was for fines, calculate them
//       if (query.includes("fine")) {
//         const today = new Date();
//         let total = 0;

//         issuedBooks.forEach((book) => {
//           const dueDate = new Date(book.dueDate);
//           const daysOverdue = Math.ceil(
//             (today - dueDate) / (1000 * 60 * 60 * 24),
//           );

//           if (daysOverdue > 0) {
//             const fineAmount = daysOverdue * 100; // Rs. 100 per day
//             total += fineAmount;
//           }
//         });

//         return res.json({
//           reply: `💰 Your current fine is Rs. ${total}`,
//         });
//       }
//     }

//     // 📖 Reserved Books
//     if (query.includes("reserved")) {
//       const reservedRes = await axios.get(
//         "http://localhost:3002/api/books/student/reserved-books",
//         axiosConfig,
//       );
//       const reservedBooks = reservedRes.data.reservations || [];

//       return res.json({
//         reply: `📖 You have reserved ${reservedBooks.length} book(s).`,
//       });
//     }

//     /* =========================
//        AI RECOMMENDATION ENGINE
//     ========================== */

//     if (query.includes("recommend") || query.includes("suggest")) {
//       const queryEmbedding = await generateEmbedding(query);

//       if (!queryEmbedding) {
//         throw new Error("Embedding generation failed");
//       }

//       const aiBooks = await BookAI.find().populate("bookId");

//       if (!aiBooks.length) {
//         return res.json({
//           reply: "No AI book data available.",
//         });
//       }

//       console.log("Query embedding length:", queryEmbedding.length);
//       console.log(
//         "First book embedding length:",
//         aiBooks[0]?.embedding?.length,
//       );

//       const scoredBooks = aiBooks
//         .filter((item) => Array.isArray(item.embedding)) // skip undefined embeddings
//         .map((item) => {
//           const similarity = cosineSimilarity(queryEmbedding, item.embedding);

//           // 🔴 FILTER LOW SIMILARITY BOOKS
//           if (similarity < 0.65) return null;

//           const score =
//             similarity * 0.7 +
//             (item.googleRating / 5) * 0.1 +
//             Math.log(item.reviewCount + 1) * 0.05 +
//             (item.bookId.availableCopies > 0 ? 0.05 : 0) +
//             (item.internalPopularity / 100) * 0.1;

//           return { book: item.bookId, score };
//         })
//         .filter(Boolean);

//       if (!scoredBooks.length) {
//         return res.json({
//           reply: "No relevant AI recommendations found.",
//         });
//       }

//       const topBooks = scoredBooks
//         .sort((a, b) => b.score - a.score)
//         .slice(0, 5);

//       const reply = topBooks
//         .map(
//           (item, index) =>
//             `${index + 1}. ${item.book.title} by ${item.book.author}`,
//         )
//         .join("\n");

//       return res.json({
//         reply: `📚 Top AI Recommendations:\n\n${reply}`,
//       });
//     }

//     /* =========================
//        FALLBACK → NORMAL SEARCH
//     ========================== */

//     const books = await Book.find({}); // Use direct DB call for general search

//     const matchedBooks = books.filter((b) => {
//       return (
//         (b.title && b.title.toLowerCase().includes(query)) ||
//         (b.isbn && b.isbn.toLowerCase().includes(query)) ||
//         (b.author && b.author.toLowerCase().includes(query)) ||
//         (b.subject && b.subject.toLowerCase().includes(query))
//       );
//     });

//     if (matchedBooks.length > 0) {
//       const reply = matchedBooks
//         .slice(0, 3)
//         .map((book) => {
//           const availableCopies = book.availableCopies || 0;
//           const status =
//             availableCopies > 0 ? "Available" : "Currently Unavailable";
//           return `📖 ${book.title}\nAuthor: ${book.author}\nStatus: ${status}`;
//         })
//         .join("\n\n");

//       return res.json({ reply: `Search Results:\n\n${reply}` });
//     }

//     // Final fallback if nothing matches
//     return res.json({
//       reply:
//         "I can help you with:\n• Fine details\n• Issued books\n• Reserved books\n• AI book recommendations\n• Book search",
//     });
//   } catch (error) {
//     console.error("Chatbot error:", error);
//     res.status(500).json({
//       reply: "An internal error occurred. Please try again later.",
//     });
//   }
// });

//-----------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --------------------------------

// Professional health check route
app.get("/api/chatbot/health", (req, res) => {
  res.json({
    status: "operational",
    message: "Library Assistance System functioning optimally",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

//-----------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --------------------------------

// ✅ Socket.io setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new_user_signup", (data) => {
    console.log("new user signup", data);

    socket.broadcast.emit("receive_new_user", {
      username: data.username,
      email: data.email, // optional
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
});

//----------------------------------
const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/api/wishlist", wishlistRoutes);

//----------------------------------

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//----------------------------------
// app.use(
//   "/auth",
//   (req, res, next) => {
//     console.log("➡️ Auth route hit:", req.method, req.url);
//     next();
//   },
//   authRoute
// );

//----------------------------------

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

//----------------------------------

// Verify email transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email service configuration is INVALID:", error);
  } else {
    console.log("Email service is ready to send messages.");
  }
});

//----------------------------------
// ✅ Start server
const startServer = async () => {
  try {
    console.log("DB_URI", process.env.DB_URI); // Debugging only
    await connectDB();
    server.listen(3002, () => {
      console.log("🚀 Server running on http://localhost:3002");
    });
  } catch (error) {
    console.log("❌ Error starting server:", error.message);
  }
};

// 🔥 Run every 5 minutes
cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running scheduled AI population...");
  await autoPopulateBookAI();
});

//----------------------------------
startServer();
