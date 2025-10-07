const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {   // Requested loan amount (5000 or 10000)
    type: Number,
    required: true
  },
  guarantor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "repaid", "repayment_requested", "repayment rejected"],
    default: "pending"
  },
  filePath: {
    type: String, // local path to uploaded screenshot
    // required: true,
  },
  issueDate: { type: Date },         // When committee approved
  repaymentDue: { type: Date },      // Due after 90 days

  repaymentRequestedDate: { type: Date },
  repaymentRejectedDate: { type: Date },
  repaidDate: { type: Date },        // Actual repayment date
  baseFine: { type: Number, default: 0 },
  lateFine: { type: Number, default: 0 },
  fine: { type: Number, default: 0 },
  disbursedAmount: {                 // Amount actually given (4700 / 9500)
    type: Number,
    default: 0
  },
  repayableAmount: {                 // Amount to be returned (5000 / 10000)
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Loan", loanSchema);
