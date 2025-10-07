const multer = require("multer");
const s3 = require("../config/s3"); // your s3.js
const multerS3 = require("multer-s3");



const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,  // e.g. "ahlan-deposit-proofs"
    // acl: "public-read",                      // or "private" if you don’t want public access
    key: function (req, file, cb) {
      const fileName = `payments/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    }
  })
});

module.exports = upload;