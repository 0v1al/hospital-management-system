const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const Doctor = require("../../models/Doctor");

router.post("/add-doctor", [authorization,
  check("specialization", "You need to select a specialization").not().isEmpty(),
  check("firstname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("lastname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("address", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("email", "Add a valid email").isEmail(),
  check("contact").trim().escape().not().isEmpty(),
  check("password", "Password is too short").trim().escape().isLength({ min: 5 })
], async (req, res) => {
  const { firstname, lastname, address, email, contact, password, specialization } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const emailAlready = await Doctor.findOne({ email: email});

    if (emailAlready) {
      return res.status(400).json({ errors: [{ msg: "A doctor with that email already exist" }] });
    }
  
    const newDoctor = await new Doctor({
      firstname: firstname,
      lastname: lastname,
      email: email,
      contact: contact,
      address: address,
      password: password,
      specialization: specialization
    });

    await newDoctor.save();

    res.status(200).send("The doctor account was created");
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add doctor]");
  }
});

router.get("/load-doctors", authorization, async (req, res) => {
  try {
    const doctors = await Doctor.find().select(["-__v"]);
    res.status(200).json(doctors);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [load doctors]");
  }
});

router.delete("/remove-doctor/:doctorEmail", authorization, async (req, res) => {
  const doctorEmail = req.params.doctorEmail;
  try {
    const result = await Doctor.findOneAndDelete({ email: doctorEmail });
    if (!result) {
      return res.status(400).json({ errors: [{ msg: "Something went wrong on removing the doctor!" }] });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [remove doctor]");
  }
});

router.put("/update-doctor", [
  check("specialization", "You need to select a specialization").not().isEmpty(),
  check("firstname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("lastname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("address", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("email", "Add a valid email").isEmail(),
  check("contact").trim().escape().not().isEmpty(),
  check("password", "Password is too short").trim().escape().isLength({ min: 5 })
], async (req, res) => {
  const { firstname, lastname, address, email, contact, password, specialization, doctorEmail } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (email !== doctorEmail) {
      const emailAlready = await Doctor.findOne({ email: email });
      
      if (emailAlready) {
        return res.status(400).json({ errors: [{ msg: "A doctor with that email already exist" }] });
      }
    }

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { 
        email: doctorEmail
      },
      {
        firstname: firstname,
        lastname: lastname,
        address: address,
        email: email,
        contact: contact,
        password: password,
        specialization: specialization
      },
      { 
        new: true
      }
    ).select(["-__v"]);

      if (!updatedDoctor) {
        return res.status(400).send("something went wrong on updateing the doctor");
      }

    res.status(200).send(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update doctor]");
  }
});

module.exports = router;