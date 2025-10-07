const express = require("express");
const upload = require("../middlewares/uploadS3");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  submitProof,
  mySubmissions,
  filterDeposit,
  approveSubmission,
  rejectSubmission,
  getDepositHistory,
  getTotalDeposit,
  getAllDeposits,
  getPendingDeposits
} = require("../controllers/depositProofController");
const Member = require("../models/Member");

const router = express.Router();

// Member: submit proof (multipart/form-data: fields year, month, file 'screenshot')
// router.post("/submit", userMiddleware, upload.single("screenshot"), submitProof);
router.post("/submit", userMiddleware, upload.single("screenshot"), submitProof);

// Member: see own submissions
router.get("/my", userMiddleware, mySubmissions);

// Admin: list submissions (optional filters ?status=&year=&month=)
router.get("/admin/filter", adminMiddleware, filterDeposit);

// Admin: approve / reject
router.post("/admin/:id/approve", adminMiddleware, approveSubmission);
router.post("/admin/:id/reject", adminMiddleware, rejectSubmission);

// Member routes
router.get("/history", userMiddleware, getDepositHistory);
router.get("/total", userMiddleware, getTotalDeposit);

// Admin route
router.get("/admin/deposits", adminMiddleware, getAllDeposits);

//getpending deposits
router.get("/pending", adminMiddleware, getPendingDeposits);



module.exports = router;