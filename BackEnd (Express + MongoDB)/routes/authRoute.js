// ========== MEMBER SIGNUP ==========
// authroute.post("/member/signup", async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       degree,
//       program,
//       batchNo,
//       rollNo,
//       cnic,
//       email,
//       password,
//       acceptedTerms,
//     } = req.body;

//     const cnicClean = cnic.replace(/\s+/g, ""); // ✅ remove all spaces

//     if (
//       !firstName ||
//       !lastName ||
//       !degree ||
//       !program ||
//       !batchNo ||
//       !rollNo ||
//       !cnicClean ||
//       !email ||
//       !password
//     )
//       return res.status(400).json({ message: "All fields are required" });

//     if (acceptedTerms !== true)
//       return res.status(400).json({ message: "You must accept the terms" });

//     if (
//       !firstName ||
//       !lastName ||
//       !cnic ||
//       !email ||
//       !degree ||
//       !program ||
//       !batchNo ||
//       !rollNo ||
//       !password
//     ) {
//       return res.status(400).json({ message: "All fields required" });
//     }
//     // const { username } = req.body;
//     const username = `${degree}${program}-${batchNo}-${rollNo}`.toUpperCase();
//     const existingUser = await Member.findOne({ username });
//     if (existingUser)
//       return res.status(400).json({ message: "Username already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newMember = await Member.create({
//       firstName,
//       lastName,
//       degree,
//       program,
//       batchNo,
//       rollNo,
//       cnic: cnicClean,
//       email,
//       username,
//       password: hashedPassword,
//       acceptedTerms,
//     });

//     res
//       .status(201)
//       .json({ message: "Member registered successfully", user: newMember });
//   } catch (error) {
//     console.error("Member signup error:", error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// });

// authroute.post("/member/signup", async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       degree,
//       program,
//       batchNo,
//       rollNo,
//       cnic,
//       email,
//       password,
//       acceptedTerms,
//     } = req.body;

//     if (
//       !firstName ||
//       !lastName ||
//       !degree ||
//       !program ||
//       !batchNo ||
//       !rollNo ||
//       !cnic ||
//       !email ||
//       !password
//     )
//       return res.status(400).json({ message: "All fields are required" });

//     const username = `${degree}${program}-${batchNo}-${rollNo}`.toUpperCase();

//     const existingUser = await Member.findOne({
//       $or: [{ username }, { cnic }, { email }],
//     });
//     if (existingUser) {
//       if (existingUser.username === username)
//         return res.status(400).json({ message: "Username already in use" });
//       if (existingUser.cnic === cnic)
//         return res.status(400).json({ message: "CNIC already registered" });
//       if (existingUser.email === email)
//         return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newMember = await Member.create({
//       firstName,
//       lastName,
//       degree,
//       program,
//       batchNo,
//       rollNo,
//       cnic,
//       email,
//       username,
//       password: hashedPassword,
//       acceptedTerms,
//     });

//     res
//       .status(201)
//       .json({ message: "Member registered successfully", user: newMember });
//   } catch (error) {
//     console.error("Member signup error:", error);

//     if (error.code === 11000) {
//       // duplicate key
//       const dupField = Object.keys(error.keyPattern)[0];
//       return res
//         .status(400)
//         .json({ message: `${dupField.toUpperCase()} already exists` });
//     }

//     res.status(500).json({
//       message:
//         "We encountered an unexpected error while processing your request. Please try again later or contact support.",
//       error: error.message, // optional, for dev/debugging
//     });
//   }
// });

//---------------------------------------------------------------------------

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Member, Admin } = require("../models/user");
const authroute = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { sendAccountEmail } = require("../services/emailService");

authroute.post("/member/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      degree,
      program,
      batchNo,
      rollNo,
      cnic,
      email,
      password,
      acceptedTerms,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !degree ||
      !program ||
      !batchNo ||
      !rollNo ||
      !cnic ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }

    if (!acceptedTerms) {
      return res
        .status(400)
        .json({ message: "⚠️ Please accept the terms first" });
    }

    const username = `${degree}${program}-${batchNo}-${rollNo}`.toUpperCase();

    // Check if user already exists (CNIC, Email, or Username)
    const existingUser = await Member.findOne({
      $or: [{ username }, { cnic }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username)
        return res.status(400).json({ message: "❌ Username already in use" });
      if (existingUser.cnic === cnic)
        return res.status(400).json({ message: "❌ CNIC already registered" });
      if (existingUser.email === email)
        return res.status(400).json({ message: "❌ Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await Member.create({
      firstName,
      lastName,
      degree,
      program,
      batchNo,
      rollNo,
      cnic,
      email,
      username,
      password: hashedPassword,
      acceptedTerms,
    });
    // 🔥 Send Welcome Email (Safe Mode)
    try {
      await sendAccountEmail({
        email: newMember.email,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        role: "Member",
        username: newMember.username,
      });
    } catch (emailErr) {
      console.log("Email failed but account created:", emailErr.message);
    }

    return res
      .status(201)
      .json({ message: "Member registered successfully!", user: newMember });
  } catch (error) {
    console.error("Member signup error:", error);

    if (error.code === 11000) {
      const dupField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `❌ ${dupField.toUpperCase()} already exists` });
    }

    return res.status(500).json({
      message: "❌ Server error. Please try again later.",
    });
  }
});

//
// ========== MEMBER LOGIN ==========
authroute.post("/member/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const user = await Member.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { userId: user._id, role: "member" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Member login error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

//
// ========== ADMIN SIGNUP ==========
authroute.post("/admin/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      username,
      cnic,
      email,
      password,
      passkey,
      acceptedTerms,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !username ||
      !cnic ||
      !email ||
      typeof passkey === "undefined" ||
      !password
    )
      return res
        .status(400)
        .json({ message: "All fields are required (including passkey)" });

    if (!process.env.ADMIN_PASSKEY) {
      console.error("ADMIN_PASSKEY not set in env");
      return res.status(500).json({ message: "Server not configured" });
    }

    if (passkey !== process.env.ADMIN_PASSKEY) {
      return res.status(401).json({ message: "Invalid admin passkey" });
    }

    if (acceptedTerms !== true)
      return res.status(400).json({ message: "You must accept the terms" });

    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingAdmin)
      return res
        .status(400)
        .json({ message: "Username or Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      username,
      cnic,
      email,
      password: hashedPassword,
      acceptedTerms,
    });
    try {
      await sendAccountEmail({
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        role: "Admin",
        username: newAdmin.username,
      });
    } catch (emailErr) {
      console.log("Email failed but account created:", emailErr.message);
    }
    res
      .status(201)
      .json({ message: "Admin registered successfully", user: newAdmin });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//
// ========== ADMIN LOGIN ==========
authroute.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const user = await Admin.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { userId: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

//
// ========== GET CURRENT LOGGED-IN MEMBER ==========
// authroute.get("/me", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user;
//     if (decoded.role === "member") {
//       user = await Member.findById(decoded.userId).select("-password");
//     } else if (decoded.role === "admin") {
//       user = await Admin.findById(decoded.userId).select("-password");
//     }

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
//----------------------------------------------------------------------------
// authroute.get("/me", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("Decoded Token:", decoded);

//     let user;
//     if (decoded.role === "member") {
//       user = await Member.findById(decoded.userId).select("-password");
//     } else if (decoded.role === "admin") {
//       user = await Admin.findById(decoded.userId).select("-password");
//     }

//     console.log("Fetched User:", user);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // res.status(200).json({ user });
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
//--------------------------------------------------------------------------

authroute.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided ❌" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired ❌" });
      }
      return res.status(401).json({ message: "Invalid token ❌" });
    }

    console.log("Decoded Token:", decoded);

    let user;
    if (decoded.role === "member") {
      user = await Member.findById(decoded.userId).select("-password");
    } else if (decoded.role === "admin") {
      user = await Admin.findById(decoded.userId).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error ❌" });
  }
});

//-------------------------------------------------------------------------
//
// ========== UPDATE STUDENT PASSWORD ==========
authroute.put("/update-password", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "member") {
      return res
        .status(403)
        .json({ message: "Only students can update password" });
    }

    const { password } = req.body;
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Member.findByIdAndUpdate(decoded.userId, {
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password updated successfully ✅" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = authroute;
