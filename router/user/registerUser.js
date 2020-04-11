const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.post("/register-user", [
  check("firstname", "Complete all the fileds").trim().escape().not().isEmpty(),
  check("lastname", "Complete all the fileds").trim().escape().not().isEmpty(),
  check("email", "Introduce a valid email").isEmail(),
  check("location", "Complete all the fileds").not().isEmpty().trim().escape(),
  check("password", "Password is too short").isLength({ min: 5 }),
  check("passwordRepeat", "Password confirmation is incorrect").custom((value, { req }) => value !== req.body.password ? false : true)
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  try {
    const { firstname, lastname, email, location, password } = req.body;
    const salt = 10;
    let alreadyExistByEmail = await User.findOne({ email });
   
    if (alreadyExistByEmail) {
      return res.status(422).json({ errors: [{ msg: "An account with the same email already exists" }] });
    }
    
    let user = new User({
      firstname,
      lastname, 
      email,
      location,
      password
    });

    const passwordCrypted = await bcrypt.hash(password, salt); //! error if it is not use with await

    user.password = passwordCrypted;
    
    await user.save();
    
    res.status(200).send("The account was created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error [register user]");
  }
});

module.exports = router;