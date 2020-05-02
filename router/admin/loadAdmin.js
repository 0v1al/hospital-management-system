const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const authorization = require("../../middlewares/authorization");
const User = require("../../models/User");
const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");
const Consultations = require("../../models/Consultation");
const Message = require("../../models/Message");

router.get("/load-admin", authorization, async (req, res) => {
  const user = req.user;
  try {
    const userLoaded = await Admin.findById(user.id).select(["-password", "-data", "-_id", "-__v"]);
    res.status(200).json(userLoaded);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [register admin]");
  }
});

router.get("/get-doctors-number", authorization, async (req, res) => {
  try {
    const doctorsNumber = await Doctor.find().count();
    res.status(200).json(doctorsNumber);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get doctors number]");
  }
});

router.get("/get-users-number", authorization, async (req, res) => {
  try {
    const usersNumber = await User.find().count();
    res.status(200).json(usersNumber);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get users number]");
  }
});

router.get("/get-patients-number", authorization, async (req, res) => {
  try {
    const patientsNumber = await Patient.find().count();
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get patient numbers]");
  }
});

router.get("/get-messages-number", authorization, async (req, res) => {
  try {
    const messagesNumber = await Message.find().count();
    res.status(200).json(messagesNumber);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get messages number]");
  }
});

router.get("/get-consultations-number",authorization, async (req, res) => {
  try {
    const consultationsNumber = await Consultations.find().count();
    res.status(200).json(consultationsNumber);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get consultations number]");
  }
});

router.get("/load-entity-number", authorization, async (req, res) => {
  try {
    const doctorsNumber = await Doctor.find().countDocuments();
    const usersNumber = await User.find().countDocuments();
    const patientsNumber = await Patient.find().countDocuments();
    const messagesNumber = await Message.find({ read: false }).countDocuments();
    const consultationsNumber = await Consultations.find().countDocuments();
    const entityNumber = {
      doctorsNumber,
      usersNumber,
      patientsNumber,
      messagesNumber,
      consultationsNumber
    };
    res.status(200).json(entityNumber);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [get entity number]");
  }
});

module.exports = router;