const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
    amount:{
        type:Number
    },
    member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    screenshotUrl: { type: String, required: true }, // S3 URL or local path
    uploadedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["repayment_requested", "repayment_rejected","repayment_approved"], default: "repayment_requested" },
    repaymentRequestedDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model("RepaymentProof", repaymentSchema);
