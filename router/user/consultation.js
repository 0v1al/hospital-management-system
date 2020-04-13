const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const Consultation = require("../../models/Consultation");
const Doctor = require("../../models/Doctor");
const User = require("../../models/User");

router.post("/add-appointment-consultation", [
  check("specializationSelect", "You need to select a specialization").not().isEmpty(),
  check("doctorSelect", "You need to select a doctor").not().isEmpty(),
  check("consultationDate", "You need to add consultation date").not().isEmpty(),
  check("consultationDate", "The consultation date cannot be in the past").custom((value, { req }) => {
    if (new Date(value).getTime() <= new Date().getTime()) return false;
    return true;
  }),
  check("consultationTime", "You need to add the time").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userEmail, doctorEmail, consultationDate, consultationTime, } = req.body;
    const doctor = await Doctor.findOne({ email: doctorEmail });
    if (!doctor) return res.status(400).send("something went wrong on adding appointment consultation"); 
    const user = await User.findOne({ email: userEmail });    
    if (!user) return res.status(400).send("something went wrong on adding appointment consultation");
    const consultation = await new Consultation({
      _user: user._id,
      _doctor: doctor._id,
      consultationDate: consultationDate,
      time: consultationTime
    });
    await consultation.save();
    res.status(200).json(consultation);  
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [user add appointment consultation]");
  }
});

router.get("/load-user-appointments-consultations/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const user = await User.findOne({ email: userEmail });
    const consultations = await Consultation.find({ _user: user._id });
    if (!user || !consultations) return res.status(400).send("something went wrong on loading the consultations");
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [user load appointment consultation]");
  }
});

router.get("/load-doctor-appointments-consultations/:doctorEmail", async (req, res) => {
  const doctorEmail = req.params.doctorEmail;
  try {
    const doctor = await Doctor.findOne({ email: doctorEmail });
    const consultations = await Consultation.find({ _doctor: doctor._id });
    if (!doctor || !consultations) return res.status(400).send("something went wrong on loading the consultations");
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [doctor load appointment consultation]");
  }
});

module.exports = router;