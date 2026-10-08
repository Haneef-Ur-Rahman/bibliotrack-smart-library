const cron = require("node-cron");
const Payment = require("../models/Payment");

const applyLateFees = async () => {
  console.log("⏰ Running late fee check...");

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    // Get all pending or overdue payments
    const payments = await Payment.find({
      status: { $in: ["pending", "overdue"] },
    });

    for (const payment of payments) {
      let hasOverdueBooks = false;

      // Ensure fineDetails is always an array
      const fines = payment.fineDetails || [];

      // ----------------------------
      // 1️⃣ Book-level fines
      // ----------------------------
      fines.forEach((item) => {
        if (item.dueDate && !item.returnDate) {
          const dueDate = new Date(item.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          const daysOverdue = Math.max(
            0,
            Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)),
          );

          item.fine = daysOverdue * 100; // Rs.100 per day per book

          if (daysOverdue > 0) hasOverdueBooks = true;

          console.log(
            `📚 Book: ${item.title}, Due: ${dueDate.toDateString()}, Days Overdue: ${daysOverdue}, Book Fine: Rs. ${item.fine}`,
          );
        }
      });

      // ----------------------------
      // 2️⃣ Challan-level late fee
      // ----------------------------
      let challanLateFee = 0;
      if (payment.dueDate) {
        const challanDueDate = new Date(payment.dueDate);
        challanDueDate.setHours(0, 0, 0, 0);

        if (today > challanDueDate) {
          const weeksOverdue = Math.floor(
            (today - challanDueDate) / (1000 * 60 * 60 * 24 * 7),
          );
          challanLateFee = weeksOverdue * 100; // Rs.100 per week for challan
        }
      }

      // Update payment document
      payment.currentLateFee = challanLateFee;
      payment.totalAmount =
        fines.reduce((sum, item) => sum + (item.fine || 0), 0) + challanLateFee;

      // Update status if any book overdue
      if (hasOverdueBooks && payment.status !== "overdue") {
        payment.status = "overdue";
      }

      await payment.save();

      console.log(
        `✅ Challan ${payment.challanNumber}: Book Fines Total = Rs. ${fines.reduce(
          (sum, item) => sum + (item.fine || 0),
          0,
        )}, Challan Late Fee = Rs. ${challanLateFee}, Total Amount = Rs. ${payment.totalAmount}`,
      );
    }

    console.log("✅ Late fee check complete.");
  } catch (error) {
    console.error("❌ Error applying late fees:", error);
  }
};

// Schedule to run every day at 12:00 AM
// cron.schedule("0 0 * * *", applyLateFees);
// To run every 2 minutes (for testing)
cron.schedule("*/2 * * * *", applyLateFees);

module.exports = applyLateFees;
