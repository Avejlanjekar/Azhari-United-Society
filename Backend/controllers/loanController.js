const Loan = require("../models/Loan");
const Member = require("../models/Member");
const Deposit = require("../models/Deposit");
const RepaymentProof = require("../models/repaymentProof");
const s3 = require("../config/s3");


// ✅ Member requests a loan
const requestLoan = async (req, res) => {
  try {
    const { amount, guarantorId } = req.body;

    // Rule: Only 5000 or 10000 loans allowed
    if (![5000, 10000].includes(amount)) {
      return res.status(400).json({ message: "Only ₹5000 or ₹10000 loans are allowed." });
    }

    // Check member eligibility: must have 6 months deposits
    const deposits = await Deposit.countDocuments({ member: req.user.id, status: "paid" });
    // if (deposits < 6) {
    //   return res.status(400).json({ message: "You must complete 6 months of deposits to request a loan." });
    // }

    // Check if member already has an active loan
    // const activeLoan = await Loan.findOne({ member: req.user.id, status: "approved" });
    const activeLoan = await Loan.findOne({
      member: req.user.id,
      status: { $in: ["approved", "pending"] } // check if status is either approved or pending
    });
    if (activeLoan) {
      return res.status(400).json({ message: "You already have an active loan or you already submitted loan request.." });
    }

    // Guarantor checks
    if (guarantorId === req.user.id) {
      return res.status(400).json({ message: "You cannot be your own guarantor." });
    }

    const guarantor = await Member.findById(guarantorId);
    if (!guarantor) {
      return res.status(404).json({ message: "Guarantor not found." });
    }

    //Guarantor can only back one active loan
    const guarantorActiveLoan = await Loan.findOne({ guarantor: guarantorId, status: { $in: ["approved", "pending", "repayment-requested"] } });
    if (guarantorActiveLoan) {
      return res.status(400).json({ message: "This guarantor is already backing another active loan." });
    }

    // Create loan request
    const loan = await Loan.create({
      member: req.user.id,
      amount,
      guarantor: guarantorId,
      status: "pending"
    });

    res.status(201).json({
      message: "Loan request submitted successfully",
      loan
    });
  } catch (err) {
    res.status(500).json({ message: "Error requesting loan", error: err.message });
  }
};

// ✅ Admin approves/rejects loan
const updateLoanStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (status === "approved") {
      loan.status = "approved";
      loan.issueDate = new Date();
      loan.repaymentDue = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days later
    } else {
      loan.status = "rejected";
    }

    await loan.save();

    res.status(200).json({
      message: `Loan ${status} successfully`,
      loan
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating loan status", error: err.message });
  }
};

// ✅ Member repays loan
// Borrower requests repayment
const requestRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;
    const filepath = req.file.key; // location (S3) or path (disk)
    if (!req.file || !filepath) {
      return res.status(400).json({ message: "Repayment screenshot is required" });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Only borrower can request repayment
    if (loan.member.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only repay your own loan" });
    }

    if (loan.status !== "approved") {
      return res.status(400).json({ message: "This loan is not active for repayment" });
    }

    loan.repaymentRequestedDate = new Date();

    // const now = new Date();
    // // Calculate fines (same as before)
    // if (loan.baseFine === 0) {
    //   loan.baseFine = loan.amount === 5000 ? 300 : 500;
    // }

    // let lateFine = 0;
    // if (now > loan.repaymentDue) {
    //   const monthsLate = Math.ceil((now - loan.repaymentDue) / (30 * 24 * 60 * 60 * 1000));
    //   lateFine = monthsLate * 100;
    // }
    // loan.lateFine = lateFine;
    // loan.fine = loan.baseFine + loan.lateFine;

    loan.filePath = req.file.key;

    // Mark as repayment requested (waiting for admin approval)
    loan.status = "repayment_requested";
    await loan.save();

    res.status(200).json({
      message: "Repayment request submitted. Awaiting admin confirmation.",
      loan,
      // fineBreakdown: {
      //   baseFine: loan.baseFine,
      //   lateFine: loan.lateFine,
      //   totalFine: loan.fine
      // }
    });
  } catch (err) {
    res.status(500).json({ message: "Error requesting repayment", error: err.message });
  }
};

// Admin confirms repayment
const confirmRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.status !== "repayment_requested") {
      return res.status(400).json({ message: "Loan has not been requested for repayment" });
    }

    const now = new Date();
    // Calculate fines (same as before)
    if (loan.baseFine === 0) {
      loan.baseFine = loan.amount === 5000 ? 300 : 500;
    }

    let lateFine = 0;
    if (now > loan.repaymentDue) {
      const monthsLate = Math.ceil((now - loan.repaymentDue) / (30 * 24 * 60 * 60 * 1000));
      lateFine = monthsLate * 100;
    }
    loan.lateFine = lateFine;
    loan.fine = loan.baseFine + loan.lateFine;

    loan.status = "repaid";
    loan.repaidDate = new Date();
    await loan.save();

    res.status(200).json({
      message: "Loan repayment confirmed by admin.",
      loan,
      fineBreakdown: {
        baseFine: loan.baseFine,
        lateFine: loan.lateFine,
        totalFine: loan.fine
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error confirming repayment", error: err.message });
  }
};

const rejectRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.status !== "repayment_requested") {
      return res.status(400).json({ message: "Loan has not been requested for repayment" });
    }

    loan.status = "approved";
    loan.filePath = null;     // clear screenshot
    loan.repaymentRequestedDate = null;
    //loan.repaidDate = new Date();
    await loan.save();

    res.status(200).json({
      message: "Loan repayment rejected by admin.",
      loan
    });
  } catch (err) {
    res.status(500).json({ message: "Error confirming repayment", error: err.message });
  }
};




// ✅ Member views their loan history
const getLoanHistory = async (req, res) => {
  try {
    const loans = await Loan.find({ member: req.user.id }).populate("guarantor", "name  middlename lastname");
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching loan history", error: err.message });
  }
};



const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: { $in: ["repayment_requested", "approved"] } })
      .populate("member guarantor", "name middlename lastname phone");

    const proofsWithUrls = loans.map((p) => {
      let fileUrl = null;

      if (p.filePath) {
        fileUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: p.filePath,  // must be just "payments/xxx.jpg"
          Expires: 60 * 5,
          ResponseContentDisposition: "inline",
        });
      }

      return {
        ...p.toObject(),
        fileUrl,
      };
    });

    res.status(200).json(proofsWithUrls);
  } catch (err) {
    res.status(500).json({ message: "Error fetching loans", error: err.message });
  }
};


const getAllPendingLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: "pending" }).populate("member guarantor", "name middlename lastname phone");
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching loans", error: err.message });
  }
};

const getAllRepaidLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: "repaid" }).populate("member guarantor", "name middlename lastname phone");
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching loans", error: err.message });
  }
}

const getTotalFine = async (req, res) => {
  try {
    const result = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$fine" } } }
    ]);

    const totalFine = result.length > 0 ? result[0].total : 0;

    res.status(200).json({
      message: "Total fine collected",
      totalFine
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching total fine", error: err.message });
  }
};

const AllMembers = async (req, res) => {
  try {
    const members = await Member.find({}, "name middlename lastname"); // name middlename lastname
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members", error: err.message });
  }
}

// ✅ Fetch active loans + repayment history
const ActiveLoan = async (req, res) => {
  try {
    const loans = await Loan.find({
      member: req.user.id,
      status: "approved"
    }).populate("member", "name middleName lastName");

    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching active loan", error: err.message });
  }
}

const RepaymentHistory = async (req, res) => {
  try {
    const loans = await Loan.find({
      member: req.user.id,
      status: { $in: ["repaid", "repayment_requested"] }
    }).populate("member", "name middleName lastName");

    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching repayment history", error: err.message });
  }
}

const getMembersSummary = async (req, res) => {
  try {
    // ✅ Total deposits (only paid)
    const deposits = await Member.aggregate([
      {
        $group: {
          _id: null, // group all documents together
          total: { $sum: "$deposits" }
        }
      }
    ]);

    // ✅ Total fines (sum of all fines)
    const result = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$fine" } } }
    ]);
    const totalFine = result.length > 0 ? result[0].total : 0;

    // ✅ Active loans (approved or repayment_requested)
    const activeLoansAgg = await Loan.aggregate([
      { $match: { status: { $in: ["approved", "repayment_requested"] } } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const activeLoans = activeLoansAgg.length > 0 ? activeLoansAgg[0].count : 0;
    const activeLoansAmount = activeLoansAgg.length > 0 ? activeLoansAgg[0].totalAmount : 0;

    res.json({
      totalDeposits: deposits.length > 0 ? deposits[0].total : 0,
      totalFine,
      activeLoans,
      activeLoansAmount
    });
  } catch (err) {
    console.error("Error in getMembersSummary:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const Members = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 }); // newest first
    
    const memberData = await Promise.all(
      members.map(async (m) => {
        const memberObj = m.toObject();
        const activeLoan = await Loan.findOne({
          member: memberObj._id,
          status: { $in: ["approved", "repayment_requested"] }
        }).sort({ createdAt: -1 });

        return {
          _id: memberObj._id,
          name: memberObj.name,
          middlename: memberObj.middlename,
          lastname: memberObj.lastname,
          phone: memberObj.phone,
          email: memberObj.email,
          role: memberObj.role,
          deposits: memberObj.deposits !== undefined ? memberObj.deposits : 0,
          joinedOn: memberObj.createdAt,
          activeLoan: activeLoan
            ? {
              amount: activeLoan.amount,
              issueDate: activeLoan.issueDate,
              repaymentDue: activeLoan.repaymentDue,
              status: activeLoan.status,
              repayableAmount: activeLoan.repayableAmount,
              fine: activeLoan.fine
            }
            : null
        };
      })
    );

    res.json(memberData);
  } catch (err) {
    console.error("❌ Error in Members controller:", err);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  requestLoan,
  updateLoanStatus,
  requestRepayment,
  confirmRepayment,
  rejectRepayment,
  getLoanHistory,
  getAllLoans,
  getAllPendingLoans,
  getAllRepaidLoans,
  getTotalFine,
  AllMembers,
  ActiveLoan,
  RepaymentHistory,
  getMembersSummary,
  Members
};
