const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ error: { msg: "No token" } });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); // return payload:{user}
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: { msg: "Token is not valid" } });
  }
};
