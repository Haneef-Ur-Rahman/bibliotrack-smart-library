// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//     try {
//       const decoder = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoder;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, invalid token" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized no token provided" });
//   }
// };

// module.exports = protect;

//--------------------------------------------------------------------------------------------------------

// const jwt = require("jsonwebtoken");

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//     try {
//       // Verify JWT
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach decoded info to req.user
//       req.user = {
//         userId: decoded.userId,
//         role: decoded.role, // 👈 ab role bhi aa raha hoga
//       };

//       next();
//     } catch (error) {
//       console.error("JWT Verify Error:", error);
//       res.status(401).json({ message: "Not authorized, invalid token" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// };

// //
// // Optional Role-based middleware
// //
// const adminOnly = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Admins only" });
//   }
//   next();
// };

// const memberOnly = (req, res, next) => {
//   if (req.user?.role !== "member") {
//     return res.status(403).json({ message: "Access denied: Members only" });
//   }
//   next();
// };

// module.exports = { protect, adminOnly, memberOnly };

//--------------------------------------------------------------------------------------------------

// ✅ middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// ✅ Protect middleware (for all secured routes)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };
      next();
    } catch (error) {
      console.error("JWT Verify Error:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

// ✅ For admin-only routes
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ✅ For member-only routes
const memberOnly = (req, res, next) => {
  if (req.user?.role !== "member") {
    return res.status(403).json({ message: "Access denied: Members only" });
  }
  next();
};

module.exports = { protect, adminOnly, memberOnly };
