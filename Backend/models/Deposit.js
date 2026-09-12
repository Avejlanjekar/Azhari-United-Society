const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({

  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  amount: {
    type: Number,
    required: true,
    default: 500
  },

  fine: {
    type: Number,
    default: 0
  },

  totalAmount: {
    type: Number,
    default: 500
  },

  date: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },

  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 3000,
  },

  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },

  filePath: {
    type: String,
  },

});

module.exports = mongoose.model("Deposit", depositSchema);