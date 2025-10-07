const path = require("path");
const s3 = require("../config/s3");
const DepositProof = require("../models/DepositProof");
const Deposit = require("../models/Deposit"); // your existing Deposit model
const Member = require("../models/Member");   // for optional balances, if you track them

// helper: ensure no duplicate pending/approved for same month
async function ensureNoActiveSubmission(memberId, year, month) {
  const existing = await DepositProof.findOne({
    member: memberId,
    year,
    month,
    status: { $in: ["pending", "approved"] },
  });
  if (existing) {
    const msg =
      existing.status === "approved"
        ? "Deposit already approved for this month."
        : "A submission is already pending for this month.";
    const err = new Error(msg);
    err.statusCode = 400;
    throw err;
  }
}

// POST /deposit-proofs/submit  (member)
const submitProof = async (req, res) => {
  try {
    const memberId = req.user.id;
    const { year, month } = req.body;

    if (!year || !month) return res.status(400).json({ message: "Year and Month are required" });
    if (!req.file) return res.status(400).json({ message: "Payment screenshot is required" });

    const y = Number(year);
    const m = Number(month);
    if (Number.isNaN(y) || Number.isNaN(m) || m < 1 || m > 12) {
      return res.status(400).json({ message: "Invalid year or month" });
    }

    await ensureNoActiveSubmission(memberId, y, m);

    const proof = await DepositProof.create({
      member: memberId,
      year: y,
      month: m,
      filePath: req.file.key,
      status: "pending",
    });

    return res.status(201).json({
      message: "Submission received. Waiting for committee approval.",
      proof,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message || "Error submitting proof" });
  }
};

// GET /deposit-proofs/my  (member) pending submission
const mySubmissions = async (req, res) => {
  try {
    const proofs = await DepositProof.find({ status: "pending" })
      .populate("member", "name middlename lastname") // only fetch needed fields
      .sort({ submittedAt: -1 }); // latest first

    // Generate signed URLs for each proof
    const proofsWithUrls = proofs.map((p) => {
      const fileUrl = p.filePath
        ? s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: p.filePath,
          Expires: 60 * 5, // URL valid for 5 minutes
          ResponseContentDisposition: "inline",
        })
        : null;

      return {
        ...p.toObject(),
        fileUrl,
      };
    });

    res.status(200).json(proofsWithUrls); // ✅ always send array
  } catch (err) {
    console.error("Error fetching pending deposits:", err);
    res.status(500).json({ message: "Error fetching pending deposits" });
  }
};

// GET /deposit-proofs/admin/list?status=pending&year=2025&month=8  (admin)
const filterDeposit = async (req, res) => {
  try {
    const { month, year, status, search } = req.query;

    let filter = {};

    // ✅ Always show only paid deposits by default
    filter.status = status || "paid";

    // ✅ Filter by month & year
    if (month && year) {
      const start = new Date(year, month - 1, 1); // month index starts at 0
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    } else if (year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }

    // ✅ Query deposits
    let deposits = await Deposit.find(filter)
      .populate("member", "firstName middleName lastName email phone")
      .sort({ date: -1 });

    // ✅ Search (name, email, phone)
    if (search) {
      const regex = new RegExp(search, "i");
      deposits = deposits.filter(
        (d) =>
          regex.test(d.member?.name || "") ||
          regex.test(d.member?.middlename || "") ||
          regex.test(d.member?.lastname || "") ||
          regex.test(d.member?.email || "") ||
          regex.test(d.member?.phone || "")
      );
    }

    res.json({ success: true, deposits });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /deposit-proofs/admin/:id/approve  (admin)
const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const proof = await DepositProof.findById(id);
    if (!proof) return res.status(404).json({ message: "Submission not found" });
    if (proof.status !== "pending") return res.status(400).json({ message: "Submission is not pending" });

    // Mark approved
    proof.status = "approved";
    proof.reviewedBy = req.user.id;
    proof.reviewedAt = new Date();
    await proof.save();

    // Create official deposit record (₹500 default)
    const deposit = await Deposit.create({
      member: proof.member,
      amount: 500,
      date: new Date(proof.year, proof.month - 1, 1), // first day of that month
      // date: new Date(),
      status: "paid",
      year: proof.year,
      month: proof.month,
      filePath: proof.filePath
    });

    // (Optional) Update a running total on Member if you use it
    await Member.findByIdAndUpdate(proof.member, { $inc: { deposits: 500 } });

    // Generate signed URL for the proof screenshot
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: proof.filePath,
      Expires: 60 * 5, // valid for 5 minutes
      ResponseContentDisposition: "inline",
    });

    res.json({
      message: "Submission approved and deposit recorded.",
      deposit,
      proof,
      fileUrl: signedUrl,
    });
  } catch (err) {
    res.status(500).json({ message: "Error approving submission" });
  }
};

// POST /deposit-proofs/admin/:id/reject  (admin)
const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    // const { note } = req.body;

    const proof = await DepositProof.findById(id);
    if (!proof) return res.status(404).json({ message: "Submission not found" });
    if (proof.status !== "pending") return res.status(400).json({ message: "Submission is not pending" });

    proof.status = "rejected";
    // proof.reviewNote = note || "Rejected by committee.";
    proof.reviewedBy = req.user.id;
    proof.reviewedAt = new Date();
    await proof.save();

    res.json({ message: "Submission rejected.", proof });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting submission" });
  }
};

// ✅ Get member's deposit history
const getDepositHistory = async (req, res) => {
  try {
    const deposits = await Deposit.find({ member: req.user.id }).sort({ date: -1 });
     const proofsWithUrls = deposits.map((p) => {
      const fileUrl = p.filePath
        ? s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: p.filePath,
          Expires: 60 * 5, // URL valid for 5 minutes
          ResponseContentDisposition: "inline",
        })
        : null;

      return {
        ...p.toObject(),
        fileUrl,
      };
    });
    res.status(200).json(proofsWithUrls);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message });
  }
};

// ✅ Get total amount deposited by member
const getTotalDeposit = async (req, res) => {
  try {
    const result = await Deposit.aggregate([
      { $match: { member: req.user._id, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.status(200).json({ totalDeposited: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching total deposit", error: err.message });
  }
};

// ✅ Admin: Get all deposits
// const getAllDeposits = async (req, res) => {
//   try {
//     const { month, year, status, search } = req.query;
//     let filter = {};

//     // ✅ Filter by status
//     if (status) filter.status = status;

//     // ✅ Filter by month/year
//     if (month && year) {
//       const start = new Date(year, month - 1, 1);
//       const end = new Date(year, month, 0, 23, 59, 59);
//       filter.date = { $gte: start, $lte: end };
//     } else if (year) {
//       const start = new Date(year, 0, 1);
//       const end = new Date(year, 11, 31, 23, 59, 59);
//       filter.date = { $gte: start, $lte: end };
//     }

//     // ✅ Fetch deposits with member info
//     let deposits = await Deposit.find(filter)
//       .populate("member", "name middlename lastname email phone")
//       .sort({ date: -1 });

//     // ✅ Search by member details
//     if (search) {
//       const regex = new RegExp(search, "i");
//       deposits = deposits.filter(
//         (d) =>
//           regex.test(d.member?.name || "") ||
//           regex.test(d.member?.middlename || "") ||
//           regex.test(d.member?.lastname || "") ||
//           regex.test(d.member?.email || "") ||
//           regex.test(d.member?.phone || "")
//       );
//     }

//     res.json({ success: true, deposits });
//   } catch (error) {
//     console.error("Error fetching deposits:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const getAllDeposits = async (req, res) => {
  try {
    const { month, year, status, search } = req.query;
    let filter = {};

    // ✅ Filter by status
    if (status) filter.status = status;

    if (month && year) {
      // ✅ Filter by month/year
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    } else if (year) {
      // ✅ Filter by full year
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    } else {
      // ✅ Default: current month deposits
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }

    // ✅ Fetch deposits with member info
    let deposits = await Deposit.find(filter)
      .populate("member", "name middlename lastname email phone")
      .sort({ date: -1 });

    // ✅ Search by member details
    if (search) {
      const regex = new RegExp(search, "i");
      deposits = deposits.filter(
        (d) =>
          regex.test(d.member?.name || "") ||
          regex.test(d.member?.middlename || "") ||
          regex.test(d.member?.lastname || "") ||
          regex.test(d.member?.email || "") ||
          regex.test(d.member?.phone || "")
      );
    }

    res.json({ success: true, deposits });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getPendingDeposits = async (req, res) => {
  try {
    const { month } = req.query; // e.g. "2025-09"
    if (!month) {
      return res.status(400).json({ message: "Month is required in YYYY-MM format" });
    }

    // 🔹 Parse month string
    const [year, mon] = month.split("-").map(Number);

    // 1. Get all members
    const members = await Member.find();

    // 2. Get deposits for that year & month with status = "paid"
    const deposits = await Deposit.find({
      year,
      month: mon,
      status: "paid",
    });

    // 3. Extract member IDs who paid
    const depositedMemberIds = deposits.map((d) => d.member.toString());

    // 4. Find pending members
    const pendingMembers = members.filter(
      (m) => !depositedMemberIds.includes(m._id.toString())
    );

    // 5. Return response
    res.json({
      month,
      pendingCount: pendingMembers.length,
      pendingMembers: pendingMembers.map((m) => ({
        name: `${m.name} ${m.middlename || ""} ${m.lastname || ""}`,
        email: m.email,
        phone: m.phone,
        memberId: m._id,
      })),
    });
  } catch (err) {
    console.error("❌ Error in getPendingDeposits:", err);
    res.status(500).json({ message: "Error fetching pending deposits", error: err.message });
  }
};


module.exports = {
  submitProof,
  mySubmissions,
  filterDeposit,
  approveSubmission,
  rejectSubmission,
  getDepositHistory,
  getTotalDeposit,
  getAllDeposits,
  getPendingDeposits

};