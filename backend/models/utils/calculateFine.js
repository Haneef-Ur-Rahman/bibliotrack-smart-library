// utils/calculateFine.js

const calculateFine = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);

  const diffTime = today - due;
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const finePerDay = 100; // PKR 100 per day
  return diffDays * finePerDay;
};

module.exports = calculateFine;
