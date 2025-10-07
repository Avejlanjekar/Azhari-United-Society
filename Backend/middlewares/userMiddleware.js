const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    let token;

    // Prefer Authorization header first
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Fallback to cookies if no header
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) throw new Error("No token provided");

    // const isBlocked = await redisClient.get(`token:${token}`);
    // if (isBlocked) throw new Error("Token expired");

    // Verify token
    const result = jwt.verify(token, process.env.JWT_SECRET);
    
    // console.log("userMiddleware triggered user user");

    req.user = result; // Attach decoded user to request
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = userMiddleware;
