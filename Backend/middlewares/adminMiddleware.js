const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("adminMiddleware triggered, user:", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).send("Access denied, Admins only");
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("adminMiddleware error:", err.message);
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = adminMiddleware;
