const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadS3");
const { requestLoan, updateLoanStatus, getLoanHistory, getAllLoans,getAllPendingLoans, getTotalFine, requestRepayment, getAllRepaidLoans, Members, confirmRepayment,rejectRepayment, AllMembers, ActiveLoan, RepaymentHistory, getMembersSummary } = require("../controllers/loanController");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Member routes
router.post("/request", userMiddleware, requestLoan);     // Request a loan
router.get("/history", userMiddleware, getLoanHistory);   // Loan history


// Admin routes
router.put("/:loanId/status", adminMiddleware, updateLoanStatus); // Approve/Reject loan
router.get("/all", adminMiddleware, getAllLoans);                 // View all loans
router.get("/allpendingloans",adminMiddleware,getAllPendingLoans);
router.get("/repaidloans", adminMiddleware, getAllRepaidLoans);

router.get("/fines/total", adminMiddleware, getTotalFine);

// Borrower action (loan taken member)
//router.post("/:loanId/request-repayment", userMiddleware,upload.single("screenshot"), requestRepayment);
router.post("/:loanId/request-repayment", userMiddleware,upload.single("screenshot"), requestRepayment);

router.get("/activeloan", userMiddleware, ActiveLoan);
router.get("/repaymenthistory", userMiddleware, RepaymentHistory);


// Admin action repaid or not
router.post("/:loanId/confirm-repayment", adminMiddleware, confirmRepayment);
router.post("/:loanId/reject-repayment", adminMiddleware, rejectRepayment);

router.get("/memberss", userMiddleware, AllMembers);

router.get("/members/summary", adminMiddleware, getMembersSummary);
router.get("/members", adminMiddleware, Members);

module.exports = router;