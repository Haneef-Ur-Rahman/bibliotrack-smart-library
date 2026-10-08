const express = require("express");
const router = express.Router();
const { Member } = require("../models/user");

// Get active members count
router.get("/dashboard/active-members", async (req, res) => {
  try {
    const now = new Date();
    const activeMembers = await Member.countDocuments({
      lastActive: { $gte: new Date(now - 5 * 60 * 1000) }, // last 5 min
    });

    res.json({ activeMembers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
