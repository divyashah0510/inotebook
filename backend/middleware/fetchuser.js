var jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchuser = (req, res, next) => {
  // Get the user from jwt token and add ID to the request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.HASH_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
