// // In controllers/fine.controller.js
// const mongoose = require("mongoose");
// const IssuedBook = require("../models/IssuedBook");
// const Payment = require("../models/Payment");
// const { Member } = require("../models/user"); // Note: lowercase 'user' and curly braces {}
// const PaymentRequest = require("../models/PaymentRequest"); // Import the new model

// // ======================================================
// // ============== CALCULATE FINE FOR A SINGLE BOOK =======
// // ======================================================
// exports.calculateFine = async (req, res) => {
//   try {
//     const { issuedBookId } = req.params;

//     const issuedBook = await IssuedBook.findById(issuedBookId);
//     if (!issuedBook) {
//       return res.status(404).json({ message: "Issued book not found" });
//     }

//     // Stop calculation if the book is already returned
//     if (issuedBook.returnDate) {
//       return res.status(200).json({
//         fine: issuedBook.fine || 0,
//         message: "Book has been returned.",
//       });
//     }

//     const today = new Date();
//     const dueDate = new Date(issuedBook.dueDate);

//     let fine = 0;

//     if (today > dueDate) {
//       const diffTime = today - dueDate;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       fine = diffDays * 100; // 100 Rs per day
//     }

//     // Only save to the database if the fine has changed
//     if (issuedBook.fine !== fine) {
//       issuedBook.fine = fine;
//       await issuedBook.save();
//     }

//     res.status(200).json({
//       fine,
//       dueDate,
//       message: "Fine calculated successfully",
//     });
//   } catch (error) {
//     console.error("Error calculating fine:", error);
//     res.status(500).json({
//       message: "Fine calculation failed",
//       error: error.message,
//     });
//   }
// };

// // ======================================================
// // ============== GET STUDENT'S ACTIVE CHALLAN ==========
// // ======================================================
// // This now returns the single most recent unpaid or overdue challan.
// exports.getStudentFines = async (req, res) => {
//   try {
//     const studentId = req.user.userId;

//     // Find the most recent unpaid or overdue challan for the student
//     const challan = await Payment.findOne({
//       studentId,
//       status: { $in: ["pending", "overdue"] },
//     })
//       .populate("studentId", "firstName lastName cnic username") // <-- ADD THIS LINE
//       .sort({ issueDate: -1 }); // Get the latest one

//     res.status(200).json({ challan });
//   } catch (error) {
//     console.error("Error fetching student challan:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch challan", error: error.message });
//   }
// };

// // ======================================================
// // ============== GENERATE PAYMENT CHALLAN ===============
// // ======================================================
// exports.generateChallan = async (req, res) => {
//   try {
//     const studentId = req.user.userId;

//     // Check if a pending or overdue challan already exists
//     const existingChallan = await Payment.findOne({
//       studentId,
//       status: { $in: ["pending", "overdue"] },
//     });
//     if (existingChallan) {
//       return res.status(200).json({
//         message: "An active challan already exists.",
//         challan: existingChallan,
//       });
//     }

//     // Calculate total fine from all issued books for the student
//     const fines = await IssuedBook.find({ studentId, fine: { $gt: 0 } });
//     if (fines.length === 0) {
//       return res.status(400).json({
//         message: "You have no outstanding fines to generate a challan for.",
//       });
//     }
//     const totalFine = fines.reduce((total, record) => total + record.fine, 0);

//     // Get student's CNIC to generate a unique challan number
//     const student = await Member.findById(studentId).select(
//       "cnic firstName lastName",
//     );
//     if (!student || !student.cnic) {
//       return res.status(400).json({
//         message: "Could not find student information to generate challan.",
//       });
//     }
//     const reversedCnic = student.cnic.split("").reverse().join("");
//     const challanNumber = `LIB-${reversedCnic}-${Date.now()}`;

//     // --- NEW LOGIC: Set a due date if the total fine is greater than 500 ---
//     let dueDate = null;
//     if (totalFine > 500) {
//       dueDate = new Date();
//       dueDate.setDate(dueDate.getDate() + 7); // Due date is 7 days from now
//     }

//     // Create the new payment record in the database
//     const newPayment = await Payment.create({
//       studentId,
//       totalAmount: totalFine,
//       challanNumber,
//       dueDate: dueDate, // Save the calculated due date (or null)
//     });

//     res.status(201).json({
//       message: "Challan generated successfully.",
//       challan: newPayment, // Return the newly created challan
//     });
//   } catch (error) {
//     console.error("Error generating challan:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to generate challan", error: error.message });
//   }
// };

// // ======================================================
// // ================== ADMIN VERIFY PAYMENT ===============
// // ======================================================
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { paymentId } = req.params;

//     const payment = await Payment.findById(paymentId);
//     if (!payment) {
//       return res.status(404).json({ message: "Payment record not found." });
//     }

//     if (payment.status === "paid") {
//       return res
//         .status(400)
//         .json({ message: "This payment has already been verified." });
//     }

//     // Mark the payment as paid
//     payment.status = "paid";
//     payment.verifiedAt = new Date();
//     await payment.save();

//     // Clear all fines for that student by setting them to 0
//     await IssuedBook.updateMany(
//       { studentId: payment.studentId, fine: { $gt: 0 } },
//       { $set: { fine: 0 } },
//     );

//     res
//       .status(200)
//       .json({ message: "Payment verified and fines cleared successfully." });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res
//       .status(500)
//       .json({ message: "Payment verification failed", error: error.message });
//   }
// };

// // In controller/fine.controller.js (add these functions at the end)

// // ======================================================
// // ============== ADMIN: GET ALL FINES OVERVIEW ==========
// // ======================================================
// exports.getAllFines = async (req, res) => {
//   try {
//     // Find all payments that are not yet paid
//     const payments = await Payment.find({
//       status: { $in: ["pending", "overdue"] },
//     })
//       .populate("studentId", "firstName lastName email cnic") // Get student details
//       .sort({ dueDate: 1, issueDate: -1 }); // Sort by due date, then by issue date

//     res.status(200).json(payments);
//   } catch (error) {
//     console.error("Error fetching all fines:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch fines", error: error.message });
//   }
// };

// // ======================================================
// // ============== ADMIN: GET PENDING PAYMENTS ============
// // ======================================================
// exports.getPendingPayments = async (req, res) => {
//   try {
//     // Find only the pending payments for verification
//     const pendingPayments = await Payment.find({
//       status: "pending",
//     })
//       .populate("studentId", "firstName lastName email")
//       .sort({ issueDate: -1 });

//     res.status(200).json(pendingPayments);
//   } catch (error) {
//     console.error("Error fetching pending payments:", error);
//     res.status(500).json({
//       message: "Failed to fetch pending payments",
//       error: error.message,
//     });
//   }
// };

// // ======================================================
// // ============== STUDENT CONFIRMS PAYMENT ==============
// // ======================================================
// exports.confirmPaymentRequest = async (req, res) => {
//   try {
//     const studentId = req.user.userId;

//     // Find the student's active challan
//     const challan = await Payment.findOne({
//       studentId,
//       status: { $in: ["pending", "overdue"] },
//     });

//     if (!challan) {
//       return res.status(400).json({
//         message: "You have no active challan to confirm payment for.",
//       });
//     }

//     // Check if a request has already been made for this challan
//     const existingRequest = await PaymentRequest.findOne({
//       paymentId: challan._id,
//     });
//     if (existingRequest) {
//       return res.status(400).json({
//         message:
//           "A payment confirmation has already been submitted for this challan.",
//       });
//     }

//     // Create the new payment request
//     const newRequest = await PaymentRequest.create({
//       studentId,
//       paymentId: challan._id,
//     });

//     res.status(201).json({
//       message: "Payment confirmation submitted. Awaiting admin verification.",
//       request: newRequest,
//     });
//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to submit confirmation", error: error.message });
//   }
// };

// // ======================================================
// // ============== ADMIN: GET PAYMENT REQUESTS ============
// // ======================================================
// exports.getPaymentRequests = async (req, res) => {
//   try {
//     // Find all pending requests and populate details
//     const requests = await PaymentRequest.find({ status: "pending" })
//       .populate("studentId", "firstName lastName email")
//       .populate(
//         "paymentId",
//         "challanNumber totalAmount currentLateFee issueDate dueDate",
//       )
//       .sort({ requestedAt: -1 }); // Show newest first

//     res.status(200).json(requests);
//   } catch (error) {
//     console.error("Error fetching payment requests:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch requests", error: error.message });
//   }
// };

// // ======================================================
// // ============== ADMIN: VERIFY PAYMENT REQUEST ==========
// // ======================================================
// exports.verifyPaymentRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const adminId = req.user.userId; // Get admin's ID

//     const request = await PaymentRequest.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Payment request not found." });
//     }

//     if (request.status === "verified") {
//       return res
//         .status(400)
//         .json({ message: "This request has already been verified." });
//     }

//     // --- Start a transaction to ensure all updates succeed or fail together ---
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // 1. Mark the request as verified
//       request.status = "verified";
//       request.verifiedAt = new Date();
//       request.verifiedBy = adminId;
//       await request.save({ session });

//       // 2. Mark the original payment as paid
//       const payment = await Payment.findById(request.paymentId).session(
//         session,
//       );
//       if (payment) {
//         payment.status = "paid";
//         payment.verifiedAt = new Date();
//         await payment.save({ session });
//       }

//       // 3. Clear all fines for that student
//       await IssuedBook.updateMany(
//         { studentId: request.studentId, fine: { $gt: 0 } },
//         { $set: { fine: 0 } },
//         { session },
//       );

//       // If everything succeeded, commit the transaction
//       await session.commitTransaction();

//       res
//         .status(200)
//         .json({ message: "Payment verified and fines cleared successfully." });
//     } catch (error) {
//       // If anything went wrong, abort the transaction
//       await session.abortTransaction();
//       throw error;
//     }
//   } catch (error) {
//     console.error("Error verifying payment request:", error);
//     res
//       .status(500)
//       .json({ message: "Verification failed", error: error.message });
//   }
// };

///////////////////////////////////////////////////////////////////////////////////////

// In controllers/fine.controller.js
const mongoose = require("mongoose");
const IssuedBook = require("../models/IssuedBook");
const Payment = require("../models/Payment");
const { Member } = require("../models/user");
const PaymentRequest = require("../models/PaymentRequest");

// ======================================================
// ============== CALCULATE FINE FOR A SINGLE BOOK =======
// ======================================================
exports.calculateFine = async (req, res) => {
  try {
    const { issuedBookId } = req.params;

    const issuedBook = await IssuedBook.findById(issuedBookId);
    if (!issuedBook) {
      return res.status(404).json({ message: "Issued book not found" });
    }

    // Stop calculation if the book is already returned
    if (issuedBook.returnDate) {
      return res.status(200).json({
        fine: issuedBook.fine || 0,
        message: "Book has been returned.",
      });
    }

    const today = new Date();
    let fine = 0;
    let dueDate = null;

    if (issuedBook.dueDate) {
      dueDate = new Date(issuedBook.dueDate);

      if (today > dueDate) {
        const diffTime = today - dueDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        fine = diffDays * (issuedBook.lateFeePerDay || 100); // dynamic per-book late fee
      }
    }

    // Only save to DB if the fine has changed
    // if (issuedBook.fine !== fine) {
    //   issuedBook.fine = fine;
    //   await issuedBook.save();
    // }

    res.status(200).json({
      fine,
      dueDate,
      message: "Fine calculated successfully",
    });
  } catch (error) {
    console.error("Error calculating fine:", error);
    res.status(500).json({
      message: "Fine calculation failed",
      error: error.message,
    });
  }
};

// ======================================================
// ============== GET STUDENT'S ACTIVE CHALLAN ==========
// ======================================================

exports.getStudentFines = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // 1️⃣ Fetch all pending or overdue payments for this student
    const payments = await Payment.find({
      studentId,
      status: { $in: ["pending", "overdue"] },
    })
      .populate("studentId", "firstName lastName cnic username")
      .sort({ issueDate: -1 });

    if (!payments || payments.length === 0) {
      return res.status(200).json({ payments: [] }); // frontend ke hisaab se
    }

    // 2️⃣ Calculate totalAmount dynamically from fineDetails (optional, if fines can change)
    const paymentsWithDetails = payments.map((payment) => {
      const paymentObj = payment.toObject();
      paymentObj.fineDetails = (payment.fineDetails || []).map((detail) => {
        // Recalculate fine if needed
        const today = new Date();
        const dueDate = new Date(detail.dueDate);
        const perDayFee = detail.lateFeePerDay || 100;

        let fine = 0;
        if (!detail.returnDate) {
          const diffDays = Math.max(
            0,
            Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
          );
          fine = diffDays * perDayFee;
        }

        return { ...detail, fine };
      });

      paymentObj.totalAmount = paymentObj.fineDetails.reduce(
        (sum, d) => sum + (d.fine || 0),
        0,
      );

      return paymentObj;
    });

    res.status(200).json({ payments: paymentsWithDetails });
  } catch (error) {
    console.error("Error fetching student fines:", error);
    res.status(500).json({
      message: "Failed to fetch fines",
      error: error.message,
    });
  }
};

// ======================================================
// ============== GENERATE PAYMENT CHALLAN ===============
// ======================================================

// exports.generateChallan = async (req, res) => {
//   try {
//     const studentId = req.user.userId;

//     // Check if a pending or overdue challan already exists
//     const existingChallan = await Payment.findOne({
//       studentId,
//       status: { $in: ["pending", "overdue"] },
//     });
//     if (existingChallan) {
//       return res.status(200).json({
//         message: "An active challan already exists.",
//         challan: existingChallan,
//       });
//     }

//     // Fetch all books issued to this student
//     const issuedBooks = await IssuedBook.find({
//       studentId,
//     }).populate("bookId", "title author isbn");

//     let totalFine = 0;
//     const fineDetails = [];

//     // Calculate fine for each book
//     for (const book of issuedBooks) {
//       const today = new Date();
//       const dueDate = new Date(book.dueDate);

//       // Skip if the book has been returned
//       if (book.returnDate) {
//         continue;
//       }

//       let fine = 0;
//       if (!book.returnDate) {
//         // only if book is not returned
//         const today = new Date();
//         const dueDate = new Date(book.dueDate);
//         const diffDays = Math.max(
//           0,
//           Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
//         );
//         fine = diffDays * 100; // per day Rs.100
//       }
//       book.fine = fine;

//       // Update the fine in the database
//       if (book.fine !== fine) {
//         book.fine = fine;
//         await book.save();

//       }
//       totalFine += fine; // ✅ Update totalFine here
//       //////////////////////////////////////////////////////////////////////////////////////////////
//       // Add to total if there's a fine
//       // if (fine > 0) {
//       //   totalFine += fine;
//       //   fineDetails.push({
//       //     bookId: book.bookId._id,
//       //     title: book.bookId.title,
//       //     author: book.bookId.author,
//       //     isbn: book.bookId.isbn,
//       //     originalFine: fine, // Store the original fine
//       //     fine: fine, // Initially same as original fine
//       //     dueDate: book.dueDate,
//       //     issueDate: book.issueDate,
//       //   });
//       // }
//     }
//     ///////////////////////////////////////////////////////////////////////////////////////////////
//     for (const book of issuedBooks) {
//       if (book.returnDate) continue; // skip returned books

//       const today = new Date();
//       const dueDate = new Date(book.dueDate);
//       const diffDays = Math.max(
//         0,
//         Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
//       );
//       const fine = diffDays * 100; // fine per day

//       book.fine = fine;
//       await book.save();

//       fineDetails.push({
//         bookId: book.bookId._id,
//         title: book.bookId.title,
//         author: book.bookId.author,
//         isbn: book.bookId.isbn,
//         originalFine: fine,
//         fine: fine,
//         dueDate: book.dueDate,
//         issueDate: book.issueDate,
//         returnDate: book.returnDate || null,
//       });
//     }

//     ///////////////////////////////////////////////////////////////////////////////////////////////

//     if (totalFine === 0) {
//       return res.status(400).json({
//         message: "You have no outstanding fines to generate a challan for.",
//       });
//     }

//     // Get student's CNIC to generate a unique challan number
//     const student = await Member.findById(studentId).select(
//       "cnic firstName lastName",
//     );
//     if (!student || !student.cnic) {
//       return res.status(400).json({
//         message: "Could not find student information to generate challan.",
//       });
//     }
//     const reversedCnic = student.cnic.split("").reverse().join("");
//     const challanNumber = `LIB-${reversedCnic}-${Date.now()}`;

//     let dueDate = null;

//     if (totalFine > 0 && totalFine < 500) {
//       dueDate = new Date();
//       dueDate.setDate(dueDate.getDate() + 7);
//     } else if (totalFine >= 500) {
//       dueDate = new Date();
//       dueDate.setDate(dueDate.getDate() + 14);
//     }

//     // Create the new payment record in the database
//     const newPayment = await Payment.create({
//       studentId,
//       totalAmount: totalFine,
//       challanNumber,
//       dueDate: dueDate,
//       fineDetails: fineDetails, // Save the fine details to the database
//     });

//     // Populate the student details for the response
//     // await newPayment.populate("studentId", "firstName lastName cnic username");
//     // Populate the student details for the response
//     const populatedPayment = await newPayment.populate(
//       "studentId",
//       "firstName lastName cnic username",
//     );
//     res.status(201).json({
//       message: "Challan generated successfully.",
//       challan: populatedPayment, // ✅ send populated student details
//     });
//   } catch (error) {
//     console.error("Error generating challan:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to generate challan", error: error.message });
//   }
// };
//---------------------------------------------------------------------------------------
exports.generateChallan = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // Check if a pending or overdue challan already exists
    const existingChallan = await Payment.findOne({
      studentId,
      status: { $in: ["pending", "overdue"] },
    }).populate("studentId", "firstName lastName cnic username"); // ✅ POPULATE HERE;

    if (existingChallan) {
      return res.status(200).json({
        message: "An active challan already exists.",
        challan: existingChallan,
      });
    }

    // Fetch all books issued to this student
    const issuedBooks = await IssuedBook.find({ studentId }).populate(
      "bookId",
      "title author isbn lateFeePerDay",
    );

    let totalFine = 0;
    const fineDetails = [];
    const today = new Date();

    for (const book of issuedBooks) {
      if (!book.dueDate) continue;

      const today = new Date();
      const dueDate = new Date(book.dueDate);
      const perDayFee = book.lateFeePerDay || 100;
      let fine = 0;

      // StudentIssuedBooks logic: only if book not returned
      if (!book.returnDate) {
        const diffDays = Math.max(
          0,
          Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
        );
        fine = diffDays * perDayFee;
      }

      // Update fine in IssuedBook
      if (book.fine !== fine) {
        book.fine = fine;
        await book.save();
      }

      // Add to totalFine only if not returned
      if (!book.returnDate && fine > 0) {
        totalFine += fine; // ✅ ADD THIS
        fineDetails.push({
          bookId: book.bookId._id,
          title: book.bookId.title,
          author: book.bookId.author,
          isbn: book.bookId.isbn,
          originalFine: fine,
          fine: fine,
          dueDate: book.dueDate,
          issueDate: book.issueDate,
          returnDate: book.returnDate || null,
        });
      }
    }

    if (totalFine === 0) {
      return res.status(400).json({
        message: "You have no outstanding fines to generate a challan for.",
      });
    }

    // Generate unique challan number
    const student = await Member.findById(studentId).select(
      "cnic firstName lastName",
    );
    if (!student || !student.cnic) {
      return res.status(400).json({
        message: "Could not find student information to generate challan.",
      });
    }

    const reversedCnic = student.cnic.split("").reverse().join("");
    const challanNumber = `LIB-${reversedCnic}-${Date.now()}`;

    // Set due date based on total fine
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (totalFine >= 500 ? 14 : 7));

    // Create Payment
    const newPayment = await Payment.create({
      studentId,
      totalAmount: totalFine,
      challanNumber,
      dueDate,
      fineDetails,
    });

    // Populate student details
    const populatedPayment = await newPayment.populate(
      "studentId",
      "firstName lastName cnic username",
    );

    res.status(201).json({
      message: "Challan generated successfully.",
      challan: populatedPayment,
    });
  } catch (error) {
    console.error("Error generating challan:", error);
    res.status(500).json({
      message: "Failed to generate challan",
      error: error.message,
    });
  }
};

// ======================================================
// ================== ADMIN VERIFY PAYMENT ===============
// ======================================================
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found." });
    }

    if (payment.status === "paid") {
      return res
        .status(400)
        .json({ message: "This payment has already been verified." });
    }

    // Mark the payment as paid
    payment.status = "paid";
    payment.verifiedAt = new Date();
    await payment.save();

    // Clear all fines for that student by setting them to 0
    // await IssuedBook.updateMany(
    //   { studentId: payment.studentId },
    //   {
    //     $set: {
    //       fine: 0,
    //       dueDate: new Date(), // ⭐ IMPORTANT
    //     },
    //   },
    // );
    await IssuedBook.updateMany(
      { studentId: payment.studentId },
      {
        $set: { fine: 0 },
        dueDate: new Date(), // ⭐ Set dueDate to now to prevent future fines from accruing
      },
    );

    res
      .status(200)
      .json({ message: "Payment verified and fines cleared successfully." });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
};

// ======================================================
// ============== ADMIN: GET ALL FINES OVERVIEW ==========
// ======================================================
// exports.getAllFines = async (req, res) => {
//   try {
//     // Find all payments that are not yet paid
//     const payments = await Payment.find({
//       status: { $in: ["pending", "overdue"] },
//     })
//       .populate("studentId", "firstName lastName email cnic")
//       .sort({ dueDate: 1, issueDate: -1 });

//     // For each payment, get detailed fine information
//     const paymentsWithDetails = await Promise.all(
//       payments.map(async (payment) => {
//         // Get all issued books for this student with fines
//         const issuedBooks = await IssuedBook.find({
//           studentId: payment.studentId._id,
//           fine: { $gt: 0 },
//         }).populate("bookId", "title author isbn");

//         // Add detailed fine information to the payment object
//         const paymentObj = payment.toObject();
//         paymentObj.fineDetails = issuedBooks.map((book) => ({
//           bookId: book.bookId._id,
//           title: book.bookId.title,
//           author: book.bookId.author,
//           isbn: book.bookId.isbn,
//           fine: book.fine,
//           dueDate: book.dueDate,
//           issueDate: book.issueDate,
//         }));

//         return paymentObj;
//       }),
//     );

//     res.status(200).json(paymentsWithDetails);
//   } catch (error) {
//     console.error("Error fetching all fines:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch fines", error: error.message });
//   }
// };
////////////////////////////////////////////////////////////////////////////////////
// ======================================================
// ============== ADMIN: GET ALL FINES OVERVIEW ==========
// ======================================================
exports.getAllFines = async (req, res) => {
  try {
    const payments = await Payment.find({
      status: { $in: ["pending", "overdue"] },
    })
      .populate("studentId", "firstName lastName cnic email username ")
      .sort({ issueDate: -1 });

    if (!payments || payments.length === 0) {
      return res.status(200).json({ payments: [] });
    }

    const today = new Date();

    const paymentsWithDetails = await Promise.all(
      payments.map(async (payment) => {
        const paymentObj = payment.toObject();

        // 🔹 Fetch IssuedBooks for this student
        const issuedBooks = await IssuedBook.find({
          studentId: payment.studentId._id,
          fine: { $gte: 0 }, // optional
        }).populate("bookId", "title author isbn lateFeePerDay ");

        // 🔹 Calculate fine for each book like studentFines
        const fineDetails = issuedBooks.map((book) => {
          const perDayFee = book.lateFeePerDay || 100;
          const dueDate = new Date(book.dueDate);
          let fine = 0;

          if (!book.returnDate) {
            const diffDays = Math.max(
              0,
              Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
            );
            fine = diffDays * perDayFee;
          }

          // Update fine in IssuedBook for future reference
          if (book.fine !== fine) {
            book.fine = fine;
            book.save(); // async save, can also await if needed
          }

          return {
            bookId: book.bookId._id,
            title: book.bookId.title,
            author: book.bookId.author,
            isbn: book.bookId.isbn,
            fine,
            dueDate: book.dueDate,
            issueDate: book.issueDate,
            returnDate: book.returnDate || null,
          };
        });

        paymentObj.fineDetails = fineDetails;
        paymentObj.totalAmount = fineDetails.reduce(
          (sum, d) => sum + (d.fine || 0),
          0,
        );

        return paymentObj;
      }),
    );

    res.status(200).json({ payments: paymentsWithDetails });
  } catch (error) {
    console.error("Error fetching all fines:", error);
    res.status(500).json({
      message: "Failed to fetch fines",
      error: error.message,
    });
  }
};

// ======================================================
// ============== ADMIN: GET PENDING PAYMENTS ============
// ======================================================
// exports.getPendingPayments = async (req, res) => {
//   try {
//     // Find only the pending payments for verification
//     const pendingPayments = await Payment.find({
//       status: "pending",
//     })
//       .populate("studentId", "firstName lastName email")
//       .sort({ issueDate: -1 });

//     // For each payment, get detailed fine information
//     const paymentsWithDetails = await Promise.all(
//       pendingPayments.map(async (payment) => {
//         // Get all issued books for this student with fines
//         const issuedBooks = await IssuedBook.find({
//           studentId: payment.studentId._id,
//           fine: { $gt: 0 },
//         }).populate("bookId", "title author isbn");

//         // Add detailed fine information to the payment object
//         const paymentObj = payment.toObject();
//         paymentObj.fineDetails = issuedBooks.map((book) => ({
//           bookId: book.bookId._id,
//           title: book.bookId.title,
//           author: book.bookId.author,
//           isbn: book.bookId.isbn,
//           fine: book.fine,
//           dueDate: book.dueDate,
//           issueDate: book.issueDate,
//         }));

//         return paymentObj;
//       }),
//     );

//     res.status(200).json(paymentsWithDetails);
//   } catch (error) {
//     console.error("Error fetching pending payments:", error);
//     res.status(500).json({
//       message: "Failed to fetch pending payments",
//       error: error.message,
//     });
//   }
// };
////////////////////////////////////////////////////////////////////////////////////
exports.getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await Payment.find({
      // status: "pending",
      status: { $in: ["pending", "overdue"] },
    })
      .populate("studentId", "firstName lastName email cnic username")
      .sort({ issueDate: -1 });

    const paymentsWithDetails = pendingPayments.map((payment) => {
      const paymentObj = payment.toObject();

      paymentObj.fineDetails = payment.fineDetails || [];

      // Calculate totalAmount from fineDetails
      paymentObj.totalAmount = paymentObj.fineDetails.reduce(
        (sum, detail) => sum + (detail.fine || 0),
        0,
      );

      paymentObj.currentLateFee = payment.currentLateFee || 0;

      return paymentObj;
    });

    res.status(200).json(paymentsWithDetails);
  } catch (error) {
    console.error("Error fetching pending payments:", error);
    res.status(500).json({
      message: "Failed to fetch pending payments",
      error: error.message,
    });
  }
};

// ======================================================
// ============== STUDENT CONFIRMS PAYMENT ==============
// ======================================================
exports.confirmPaymentRequest = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // Find the student's active challan
    const challan = await Payment.findOne({
      studentId,
      status: { $in: ["pending", "overdue"] },
    });

    if (!challan) {
      return res.status(400).json({
        message: "You have no active challan to confirm payment for.",
      });
    }

    // Check if a request has already been made for this challan
    const existingRequest = await PaymentRequest.findOne({
      paymentId: challan._id,
    });
    if (existingRequest) {
      return res.status(400).json({
        message:
          "A payment confirmation has already been submitted for this challan.",
      });
    }

    // Create the new payment request
    const newRequest = await PaymentRequest.create({
      studentId,
      paymentId: challan._id,
    });

    res.status(201).json({
      message: "Payment confirmation submitted. Awaiting admin verification.",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res
      .status(500)
      .json({ message: "Failed to submit confirmation", error: error.message });
  }
};

// ======================================================
// ============== ADMIN: GET PAYMENT REQUESTS ============
// ======================================================
// exports.getPaymentRequests = async (req, res) => {
//   try {
//     // Find all pending requests and populate details
//     const requests = await PaymentRequest.find({ status: "pending" })
//       .populate("studentId", "firstName lastName email")
//       .populate(
//         "paymentId",
//         "challanNumber totalAmount currentLateFee issueDate dueDate",
//       )
//       .sort({ requestedAt: -1 }); // Show newest first

//     // For each request, get detailed fine information
//     const requestsWithDetails = await Promise.all(
//       requests.map(async (request) => {
//         // Get all issued books for this student with fines
//         const issuedBooks = await IssuedBook.find({
//           studentId: request.studentId._id,
//           fine: { $gt: 0 },
//         }).populate("bookId", "title author isbn");

//         // Add detailed fine information to the request object
//         const requestObj = request.toObject();
//         requestObj.fineDetails = issuedBooks.map((book) => ({
//           bookId: book.bookId._id,
//           title: book.bookId.title,
//           author: book.bookId.author,
//           isbn: book.bookId.isbn,
//           fine: book.fine,
//           dueDate: book.dueDate,
//           issueDate: book.issueDate,
//         }));

//         return requestObj;
//       }),
//     );

//     res.status(200).json(requestsWithDetails);
//   } catch (error) {
//     console.error("Error fetching payment requests:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch requests", error: error.message });
//   }
// };
//////////////////////////////////////////////////////////////////////////////////////
// exports.getPaymentRequests = async (req, res) => {
//   try {
//     const requests = await PaymentRequest.find({ status: "pending" })
//       .populate("studentId", "firstName lastName email")
//       .populate(
//         "paymentId",
//         "challanNumber totalAmount fineDetails currentLateFee issueDate dueDate",
//       )
//       .sort({ requestedAt: -1 });

//     const requestsWithDetails = requests.map((request) => {
//       const requestObj = request.toObject();

//       requestObj.fineDetails = request.paymentId?.fineDetails || [];

//       // Calculate totalAmount from fineDetails
//       requestObj.totalAmount = requestObj.fineDetails.reduce(
//         (sum, detail) => sum + (detail.fine || 0),
//         0,
//       );

//       requestObj.currentLateFee = request.paymentId?.currentLateFee || 0;

//       return requestObj;
//     });

//     res.status(200).json(requestsWithDetails);
//   } catch (error) {
//     console.error("Error fetching payment requests:", error);
//     res.status(500).json({
//       message: "Failed to fetch requests",
//       error: error.message,
//     });
//   }
// };
//----------------------------------------------------------------------------------------------
exports.getPaymentRequests = async (req, res) => {
  try {
    // 1️⃣ Get all pending payment requests
    const requests = await PaymentRequest.find({ status: "pending" })
      .populate("studentId", "firstName lastName email cnic username")
      .populate(
        "paymentId",
        "challanNumber totalAmount fineDetails currentLateFee issueDate dueDate",
      )
      .sort({ requestedAt: -1 });

    const today = new Date();

    // 2️⃣ Map requests and calculate fines exactly like getAllFines
    const requestsWithDetails = await Promise.all(
      requests.map(async (request) => {
        const requestObj = request.toObject();

        // 🔹 Fetch all issued books for this student
        const issuedBooks = await IssuedBook.find({
          studentId: request.studentId._id,
        }).populate("bookId", "title author isbn lateFeePerDay");

        // 🔹 Calculate fine for each book like getAllFines
        const fineDetails = await Promise.all(
          issuedBooks.map(async (book) => {
            const perDayFee = book.lateFeePerDay || 100;
            const dueDate = new Date(book.dueDate);
            let fine = 0;

            if (!book.returnDate) {
              const diffDays = Math.max(
                0,
                Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)),
              );
              fine = diffDays * perDayFee;
            }

            // Update fine in IssuedBook exactly like getAllFines
            if (book.fine !== fine) {
              book.fine = fine;
              await book.save();
            }

            return {
              bookId: book.bookId._id,
              title: book.bookId.title,
              author: book.bookId.author,
              isbn: book.bookId.isbn,
              fine,
              dueDate: book.dueDate,
              issueDate: book.issueDate,
              returnDate: book.returnDate || null,
            };
          }),
        );

        requestObj.fineDetails = fineDetails;

        // 🔹 Total amount = sum of all fines (same as getAllFines)
        requestObj.totalAmount = fineDetails.reduce(
          (sum, d) => sum + (d.fine || 0),
          0,
        );

        requestObj.currentLateFee = request.paymentId?.currentLateFee || 0;

        return requestObj;
      }),
    );

    res.status(200).json({ payments: requestsWithDetails });
  } catch (error) {
    console.error("Error fetching payment requests:", error);
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};

// ======================================================
// ============== ADMIN: VERIFY PAYMENT REQUEST ==========
// ======================================================
exports.verifyPaymentRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const adminId = req.user.userId; // Get admin's ID

    const request = await PaymentRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Payment request not found." });
    }

    if (request.status === "verified") {
      return res
        .status(400)
        .json({ message: "This request has already been verified." });
    }

    // Start a transaction to ensure all updates succeed or fail together
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Mark the request as verified
      request.status = "verified";
      request.verifiedAt = new Date();
      request.verifiedBy = adminId;
      await request.save({ session });

      // 2. Mark the original payment as paid
      const payment = await Payment.findById(request.paymentId).session(
        session,
      );
      if (payment) {
        payment.status = "paid";
        payment.verifiedAt = new Date();
        await payment.save({ session });
      }

      // 3. Clear all fines for that student
      await IssuedBook.updateMany(
        { studentId: request.studentId },
        {
          $set: {
            fine: 0,
            dueDate: new Date(), // ⭐ RESET DUE DATE
          },
        },
        { session },
      );

      // If everything succeeded, commit the transaction
      await session.commitTransaction();

      res
        .status(200)
        .json({ message: "Payment verified and fines cleared successfully." });
    } catch (error) {
      // If anything went wrong, abort the transaction
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    console.error("Error verifying payment request:", error);
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};
