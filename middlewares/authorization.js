require('dotenv').config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(422).json({ errors: [{ msg: "Authorization denied" }] });
  }

  try {
    await jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
      if (error) {
        return res.status(422).json({ errors: [{ msg: "Token is not valid" }] });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something went wrong [authorization]");
    res.status(500).send("Server error [authorization]");
  }
}

module.exports = authorization;