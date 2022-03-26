const jwt = require("jsonwebtoken");
const constant = require("../constant")

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
        code: constant.respStatus.UNAUTHORIZED,
        message: "Missing token",
        error_code: constant.errorCode.UNAUTHORIZED
    });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
        code: constant.respStatus.INVALID,
        message: "Invalid Token",
        error_code: constant.errorCode.INVALID
    });
  }

  return next();
};

module.exports = verifyToken;
