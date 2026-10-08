const mongoose = require("mongoose");

//
// MEMBER SCHEMA
//
const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    program: {
      type: String,
      enum: ["CS", "AI", "CSec", "DS", "SE"],
      required: true,
    },
    degree: {
      type: String,
      enum: ["BS", "MS", "PHD"], // capital sab
      required: true,
      uppercase: true,
    },

    batchNo: {
      type: Number,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{13}$/, "CNIC must be exactly 13 digits long"], // only digits allowed
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      // ⚡ username will be auto-generated in route like: program-batchNo-rollNo
    },
    password: {
      type: String,
      required: true,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

//
// ADMIN SCHEMA
//
const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{13}$/, "CNIC must be exactly 13 digits long"], // only digits allowed
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

//
// EXPORT MODELS
//
const Member = mongoose.model("Member", memberSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Member, Admin };
