const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login-admin", [
  check("email", "Introduce a valid email").isEmail(),
  check("password", "Password is too short").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(422).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // const match = await bcrypt.compare(password, admin.password);
    const match = password === admin.password;

    if (!match) {
      return res.status(422).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: { id: admin._id }, algorithm: "HS384"}, process.env.PRIVATE_KEY);

    res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error, [admin.patient]");
  } 
});

router.put("/change-password-admin", [
  check("password", "You need to add your current password").trim().escape().not().isEmpty(),
  check("newPassword", "You need to add your new password").trim().escape().not().isEmpty(),
  check("repeatNewPassword", "You need to add your repeat password").trim().escape().not().isEmpty()
], async (req, res) => {
  const { password, newPassword, repeatNewPassword, email } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (password === newPassword ) {
    return res.status(400).json({ errors: [{ msg: "your new password must be different" }] });
  }

  try {
    const admin = await Admin.findOne({ email: email, password: password });
    
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Your current password is not correct" }] });
    }

    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ errors: [{ msg: "The passwords doesn't match" }] });
    }

    const adminUpdate = await Admin.findOneAndUpdate(
      { email: email },
      { password: newPassword },
      { new: true }
    );
    await adminUpdate.save(err => err && console.log(err));
    res.status(200).json(adminUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [change password doctor]");
  }
});

module.exports = router;