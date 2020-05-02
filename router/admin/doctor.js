const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");
const User = require("../../models/User");
const Admin = require("../../models/Admin");

router.post("/add-doctor", [authorization,
  check("specialization", "You need to select a specialization").not().isEmpty(),
  check("firstname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("lastname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("address", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("email", "Add a valid email").isEmail(),
  check("contact").trim().escape().not().isEmpty(),
  check("password", "Password is too short").trim().escape().isLength({ min: 5 }),
  check("consultationPrice", "You need to add a consultation price").trim().escape().not().isEmpty()
], async (req, res) => {
  const { firstname, lastname, address, email, contact, password, specialization, consultationPrice } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const emailAlreadyDoctor = await Doctor.findOne({ email: email});
    const emailAlreadyUser = await User.findOne({ email: email });
    const emailAlreadyPatient = await Patient.findOne({ email: email });
    const emailAlreadyAdmin = await Admin.findOne({ email: email });

    if (emailAlreadyDoctor || emailAlreadyPatient || emailAlreadyUser || emailAlreadyAdmin) {
      return res.status(400).json({ errors: [{ msg: "An account with this email already exist" }] });
    }
  
    const newDoctor = new Doctor({
      firstname: firstname,
      lastname: lastname,
      email: email,
      contact: contact,
      address: address,
      password: password,
      specialization: specialization,
      consultationPrice: consultationPrice
    });
    await newDoctor.save(error => error ? console.log(error) : null);
    res.status(200).send("The doctor account was created");
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add doctor]");
  }
});

router.get("/load-doctors", authorization, async (req, res) => {
  try {
    const doctors = await Doctor.find().select(["-__v", "-password"]);
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

router.put("/update-doctor", [authorization,
  check("specialization", "You need to select a specialization").not().isEmpty(),
  check("firstname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("lastname", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("address", "You need to complete all the fields").trim().escape().not().isEmpty(),
  check("email", "Add a valid email").isEmail(),
  check("contact").trim().escape().not().isEmpty(),
  check("password", "Password is too short").trim().escape().isLength({ min: 5 }),
  check("consultationPrice", "You need to add a consultation price").trim().escape().not().isEmpty()
], async (req, res) => {
  const { firstname, lastname, address, email, contact, password, specialization, doctorEmail, consultationPrice } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (email !== doctorEmail) {
      const emailAlreadyDoctor = await Doctor.findOne({ email: email });
      const emailAlreadyUser = await User.findOne({ email: email });
      const emailAlreadyAdmin = await Admin.findOne({ email: email });
      const emailAlreadyPatient = await Patient.findOne({ email: email });
      
      if (emailAlreadyDoctor || emailAlreadyPatient || emailAlreadyUser || emailAlreadyAdmin) {
        return res.status(400).json({ errors: [{ msg: "An account with this email already exist" }] });
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
        specialization: specialization,
        consultationPrice: consultationPrice
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

router.get("/patient-reports/:fromDate/:toDate", authorization, async (req, res) => {
  const fromDate = new Date(req.params.fromDate);
  const toDate = new Date(req.params.toDate);
  if (!fromDate || !toDate) {
    return res.status(400).json({ errors: [{ msg: "You need to add the dates" }] }); 
  }

  if (fromDate.getTime() >= toDate.getTime()) {
    return res.status(400).json({ errors: [{ msg: "From date cannot be greater than to date" }] });
  }
  
  try {
    const patients = await Patient.find({ date: { $gte: fromDate, $lte: toDate } }).select(["-__v"]);
    
    if (!patients.length) {
      return res.status(400).json({ errors: [{ msg: "No patients was registered between this dates" }] });
    }
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [admin reports patients]");
  }
});

module.exports = router;