const redisClient = require("../config/redis");
const Member = require("../models/Member");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Loan = require("../models/Loan");
const Deposit = require("../models/Deposit");

// REGISTER MEMBER
const register = async (req, res) => {
  try {
    validate(req.body);

    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "member";

    const member = await Member.create(req.body);

    res.status(201).json({
      user: { name: member.name, email: member.email, _id: member._id },
      message: "Registered Successfully",
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    const user = await Member.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successfully",
      token,  //  Send token here
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token not found");

    const payload = jwt.decode(token);
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged Out Successfully");
  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
};

// REGISTER ADMIN (only admin can do this)
const adminRegister = async (req, res) => {
  try {
    validate(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const admin = await Member.create({ ...req.body, role: "admin" });

    res.status(201).send("Admin Registered Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// DELETE PROFILE
const deleteProfile = async (req, res) => {
  try {
    const memberId = req.user.id;
    await Member.findByIdAndDelete(memberId);
    res.status(200).send("Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// GET PROFILE (member)
const getProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id).select("-password");
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // ✅ Deposits
    const deposits = await Deposit.find({ member: req.user.id, status: "paid" })
      .sort({ date: -1 });
    //const totalDeposited = deposits.reduce((sum, d) => sum + d.amount, 0);
    const totalDeposited=member.deposits;
    const lastDeposit = deposits[0] || null;

    // ✅ Loans with "statusDate"
    let loans = await Loan.find({ member: req.user.id })
      .populate("guarantor", "name email")
      .sort({ createdAt: -1 });

    loans = loans.map((loan) => {
      let statusDate = null;

      if (loan.status === "pending") statusDate = loan.createdAt;
      if (loan.status === "approved") statusDate = loan.issueDate;
      if (loan.status === "repaid") statusDate = loan.repaidDate;

      return {
        ...loan.toObject(),
        statusDate,
      };
    });

    const lastLoan = loans[0] || null;

    res.status(200).json({
      message: "Profile fetched successfully",
      profile: {
        basicInfo: {
          name: `${member.name} ${member.middlename} ${member.lastname}`,
          email: member.email,
          phone: member.phone,
          role: member.role,
          joinedOn: member.createdAt,
        },
        stats: {
          totalDeposited,
          lastDeposit,
          lastLoan,
        },
        recentDeposits: deposits.slice(0, 5),
        recentLoans: loans.slice(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};




module.exports = { register, login, logout, adminRegister, deleteProfile, getProfile };