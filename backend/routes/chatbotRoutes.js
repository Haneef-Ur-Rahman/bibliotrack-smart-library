const express = require("express");
const router = express.Router();

const { chatbot } = require("../controller/chatbotController");
const { protect, memberOnly } = require("../middleware/authMiddleware");

router.post("/chatbot", chatbot);

module.exports = router;
