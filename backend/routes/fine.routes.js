// In routes/fine.routes.js

const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

// Make sure all these functions are imported correctly
const {
  calculateFine,
  getStudentFines,
  generateChallan,
  getAllFines, // <-- NEW
  getPendingPayments, // <-- NEW
  confirmPaymentRequest, // New
  getPaymentRequests, // New
  verifyPaymentRequest, // New (replaces verifyPayment)
} = require("../controller/fine.controller.js");

// --- Student Routes ---
router.get("/student", protect, getStudentFines);
router.post("/generate-challan", protect, generateChallan);
router.get("/calculate/:issuedBookId", protect, calculateFine);
router.post("/confirm-payment", protect, confirmPaymentRequest); // New

// --- Admin Routes (ARE THESE PRESENT?) ---
router.get("/admin/all", protect, adminOnly, getAllFines); // <-- THIS ONE
router.get("/admin/pending", protect, adminOnly, getPendingPayments); // <-- AND THIS ONE
// In fine.routes.js

router.post(
  "/admin/verify/:paymentId",
  protect,
  adminOnly,
  verifyPaymentRequest,
);
router.get("/admin/payment-requests", protect, adminOnly, getPaymentRequests); // New
router.post(
  "/admin/verify-request/:requestId",
  protect,
  adminOnly,
  verifyPaymentRequest,
); // New

module.exports = router;
