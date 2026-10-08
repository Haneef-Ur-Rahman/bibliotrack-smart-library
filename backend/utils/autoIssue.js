const IssuedBook = require("../models/IssuedBook");
const Reservation = require("../models/Reservation");
const Book = require("../models/Book");

async function autoIssueIfReserved(bookId) {
  const book = await Book.findById(bookId);
  if (!book || book.availableCopies <= 0) return;

  while (book.availableCopies > 0) {
    const nextReservation = await Reservation.findOne({
      bookId,
      status: "pending",
    }).sort({ reservationDate: 1 });

    if (!nextReservation) break;

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 1);

    await IssuedBook.create({
      studentId: nextReservation.studentId,
      bookId,
      issueDate,
      dueDate,
    });

    nextReservation.status = "issued";
    await nextReservation.save();

    book.availableCopies--;
    await book.save();
  }
}

module.exports = autoIssueIfReserved;
