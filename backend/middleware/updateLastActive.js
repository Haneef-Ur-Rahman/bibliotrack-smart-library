const { Member } = require("../models/user"); // existing schema

const updateLastActive = async (req, res, next) => {
  try {
    const userId = req.user?.userId; // authMiddleware se aayega
    const userRole = req.user?.role;

    if (userId && userRole === "member") {
      await Member.findByIdAndUpdate(userId, { lastActive: new Date() });
    }

    next();
  } catch (err) {
    console.error("Error updating lastActive:", err);
    next();
  }
};

module.exports = updateLastActive;
