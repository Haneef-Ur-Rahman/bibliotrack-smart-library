const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSpecifiedUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const {
  protect,
  adminOnly,
  memberOnly,
} = require("../middleware/authMiddleware");

const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pics",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

// router.post("/createNewUser", upload.single("profile_pic"), createNewUser);
router.get("/getAllUsers", protect, adminOnly, getAllUsers);
router.delete("/deleteUser/:userId", protect, deleteUser); // delete user by id
router.get("/getSpecifiedUser/:userId", protect, getSpecifiedUser); // get user by id
router.put(
  "/updateUser/:userId",
  protect,
  // upload.single("profile_pic"),
  updateUser
); // update user by id
router.post("/upload", upload.single("profile_pic"), (req, res) => {
  console.log(req.file); // agar ye undefined aa raha hai → multer issue
  res.json({ file: req.file });
});
// router.post("/member/signup", async (req, res) => {
//   console.log("➡️ Signup payload:", req.body);
//   // rest of code...
// });

module.exports = router;
