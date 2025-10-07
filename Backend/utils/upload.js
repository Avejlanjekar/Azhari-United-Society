const path = require("path");
const fs = require("fs");
const multer = require("multer");

// ensure upload dir exists
const uploadsRoot = path.join(__dirname, "..", "uploads");
const paymentDir = path.join(uploadsRoot, "payments");
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot);
if (!fs.existsSync(paymentDir)) fs.mkdirSync(paymentDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, paymentDir);
  },
  filename: function (req, file, cb) {
    // unique filename: memberId_year_month_timestamp.ext
    const ext = path.extname(file.originalname || "");
    const base = `${req.user?.id || "anon"}_${req.body.year || "y"}_${req.body.month || "m"}_${Date.now()}`;
    cb(null, base + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // accept images & pdfs
  const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf", "image/heic", "image/webp"];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only images (png, jpg, jpeg, webp, heic) or PDF allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
