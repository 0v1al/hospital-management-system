const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Doctor = require("../../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login-doctor", [
  check("email", "Introduce a valid email").isEmail(),
  check("password", "Password is too short").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(422).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    
    // const match = await bcrypt.compare(password, doctor.password);
    const match = password === doctor.password;

    if (!match) {
      return res.status(422).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: { id: doctor._id }, algorithm: "HS384"}, process.env.PRIVATE_KEY);

    // let decoded = await jwt.verify(token, process.env.PRIVATE_KEY);  
    await Doctor.findOneAndUpdate({ email: email }, { loginTime: new Date() });
    return res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error, [login doctor]");
  } 
});

router.put("/logout-doctor/:doctorEmail", async (req, res) => {
  try {
    const doctorEmail = req.params.doctorEmail;
    await Doctor.findOneAndUpdate({ email: doctorEmail }, { logoutTime: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [logout doctor]");
  }
});

module.exports = router;