const { Member } = require("../models/user");
const bcrypt = require("bcryptjs");

// create new member (signup)
exports.createNewUser = async (req, res) => {
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
      !password ||
      !acceptedTerms
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const username = `${degree}${program}-${batchNo}-${rollNo}`.toUpperCase();

    const existing = await Member.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already in use" });

    const hashPassword = await bcrypt.hash(password, 10);

    // let profilePic = req.file ? req.file.path : null;

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
      password: hashPassword,
      acceptedTerms,
    });

    res.status(201).json({ message: "Member created successfully", newMember });
  } catch (error) {
    console.error("❌ Error in createNewUser:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// get all members (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const users = await Member.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.log("Get all users error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// get specific member (Admin only)
exports.getSpecifiedUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const user = await Member.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    console.log("Get user by id error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// update member (Member = only own password/profile, Admin = full access)
// exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // If not admin, only allow self-update
//     if (req.user.role !== "admin" && req.user.userId !== userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     let updateData = { ...req.body };

//     // If member (not admin), restrict fields
//     if (req.user.role === "member") {
//       updateData = {};
//       if (req.body.password) {
//         updateData.password = await bcrypt.hash(req.body.password, 10);
//       }
//       if (req.file) {
//         updateData.profilePic = req.file.path;
//       }
//     } else {
//       // If admin, allow full update
//       if (updateData.password) {
//         updateData.password = await bcrypt.hash(updateData.password, 10);
//       }
//       if (req.file) {
//         updateData.profilePic = req.file.path;
//       }
//     }

//     const updatedUser = await Member.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     });
//     if (!updatedUser)
//       return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (error) {
//     console.log("Update user error", error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// };
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user is allowed
    if (req.user.role !== "admin" && req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    let updateData = {};

    // ✅ Case 1: Member (student)
    if (req.user.role === "member") {
      if (req.body.password) {
        updateData.password = await bcrypt.hash(req.body.password, 10);
      }
      if (req.file) {
        updateData.profilePic = req.file.path;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "Members can only update password or profile picture",
        });
      }
    }

    // ✅ Case 2: Admin
    if (req.user.role === "admin") {
      updateData = { ...req.body };
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      // if (req.file) {
      //   updateData.profilePic = req.file.path;
      // }
    }

    const updatedUser = await Member.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Update user error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// delete member (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const deletedUser = await Member.findByIdAndDelete(req.params.userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Delete user error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// get current logged-in user (Member only)
exports.getMe = async (req, res) => {
  try {
    const user = await Member.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        cnic: user.cnic, // ✅ add this
        degree: user.degree,
        program: user.program,
        batchNo: user.batchNo,
        rollNo: user.rollNo,
        email: user.email,
        username: user.username,
        acceptedTerms: user.acceptedTerms,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
