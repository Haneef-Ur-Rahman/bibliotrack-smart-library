const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const IssuedBook = require("../models/IssuedBook");
const generateChallan = require("../utils/generateChallan");
const { protect } = require("../middleware/authMiddleware");

router.post("/pay/:issuedId", protect, async (req, res) => {
  const issued = await IssuedBook.findById(req.params.issuedId).populate(
    "studentId",
  );

  if (!issued) return res.status(404).json({ message: "Issue not found" });

  if (issued.fine <= 0)
    return res.status(400).json({ message: "No fine to pay" });

  const challanNumber = generateChallan(issued.studentId.cnic, issued._id);

  const payment = await Payment.create({
    memberId: issued.studentId._id,
    issueId: issued._id,
    challanNumber,
    amount: issued.fine,
  });

  res.json({
    message: "Payment successful",
    challanNumber,
    amount: issued.fine,
  });
});

module.exports = router;
