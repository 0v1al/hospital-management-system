const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Patient = require("../../models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login-patient", [
  check("email", "The email is not valid").isEmail(),
  check("password", "Password is too short").isLength({ min: 5 })
], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const match = await bcrypt.compare(password, patient.password);

    if (!match) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: { id: patient._id }, algorithm: "HS384"}, process.env.PRIVATE_KEY);

    return res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
     res.status(500).send("Server error [login patient]");
  } 
});

module.exports = router;