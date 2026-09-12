const mongoose = require("mongoose");

const depositProofSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 3000,
    },
    month: {
      type: Number, // 1..12
      required: true,
      min: 1,
      max: 12,
    },
    filePath: {
      type: String, // local path to uploaded screenshot
      //required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    amount: {
      type: Number,
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
    rejectionReason: {
      type: String,
      default: null,
      trim: true
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // admin who approved/rejected
    },
    reviewedAt: Date,
    reviewNote: String,
  },
  { timestamps: true }
);

// prevent duplicate submissions for same month/year when one is pending/approved
depositProofSchema.index(
  { member: 1, year: 1, month: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["pending", "approved"] } } }
);

module.exports = mongoose.model("DepositProof", depositProofSchema);
