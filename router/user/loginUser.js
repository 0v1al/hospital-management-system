const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../../models/Patient");

router.post("/login-user", [
  check("email", "The email is not valid").isEmail(),
  check("password", "Password is too short").isLength({ min: 5 })
], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: { id: user._id }, algorithm: "HS384"}, process.env.PRIVATE_KEY);

    await User.findOneAndUpdate({ email }, { loginTime: new Date() });
    return res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
     res.status(500).send("Server error [login user]");
  } 
});

router.put("/logout-user/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    await User.findOneAndUpdate({ email: userEmail }, { logoutTime: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [logout user]");
  }
});

router.put("/change-password-user", [
  check("password", "You need to add your actual password").trim().escape().not().isEmpty(),
  check("newPassword", "You need to add your new password").trim().escape().not().isEmpty()
], async (req, res) => {
  const { password, newPassword, repeatNewPassword, email } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (newPassword !== repeatNewPassword) {
    return res.status(400).json({ errors: [{ msg: "The passwords doesn't match" }] });
  }

  try {
    const user = await User.findOne({ email: email, password: password });
    
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Your actual password is not correct" }] });
    }

    const userUpdate = await User.findOneAndUpdate(
      { email: email, password: password },
      { password: newPassword },
      { new: true }
    );
    await userUpdate.save(err => err && console.log(err));
    res.status(200).json(userUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [change password]");
  }
});

router.put("/update-profile-user/:userEmail", [
  check("firstname", "you need to add your firstname").trim().escape().not().isEmpty(),
  check("lastname", "you need to add your lastname").trim().escape().not().isEmpty(),
  check("location", "you need to add your location").trim().escape().not().isEmpty(),
  check("email", "you need to add a valid email").trim().isEmail()
], async (req, res) => {
  const userEmail = req.params.userEmail;
  const { firstname, lastname, email, location } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    if (userEmail !== email) {
      const emailAlready = await User.findOne({ email: email });
      
      if (emailAlready) {
        return res.status(400).json({ errors: [{ msg: "A user with this email already exist" }] });
      }
    }

    const userUpdate = await User.findOneAndUpdate(
      { email: userEmail },
      { 
        firstname: firstname, 
        lastname: lastname, 
        email: email,
        location: location 
      },
      { new: true }
    );
    await userUpdate.save(err => err && console.log(err));
    res.status(200).json(userUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [change profile user]");
  }
});

module.exports = router;