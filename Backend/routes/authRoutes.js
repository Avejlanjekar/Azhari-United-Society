const express = require("express");
const { register, login, logout, adminRegister, deleteProfile, getProfile } = require("../controllers/authController");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// // Only Admin can register new members
// router.post("/register",adminMiddleware,register);

// // Both member & admin can login
// router.post("/login", login);

// router.post("/logout", userMiddleware, logout);
// //router.post("/admin/register", adminMiddleware, adminRegister);
// router.delete("/delete", userMiddleware, deleteProfile);

// // Get own profile (member or admin)
// router.get("/profile", userMiddleware, getProfile);

router.post("/admin/register",adminMiddleware, adminRegister);

//  After login, Admin can register members
router.post("/register", adminMiddleware, register);

//  Common APIs
router.post("/login", login);
router.post("/logout", userMiddleware, logout);
router.delete("/delete", adminMiddleware, deleteProfile);
router.get("/profile", userMiddleware, getProfile);


module.exports = router;