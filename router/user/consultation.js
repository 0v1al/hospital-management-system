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
    if (new Date(value).getTime() <= new Date().getTime()) {
      return false;
    }
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
    
    if (!doctor) {
      return res.status(400).send("something went wrong on adding appointment consultation"); 
    }

    const user = await User.findOne({ email: userEmail });    
    
    if (!user) {
      return res.status(400).send("something went wrong on adding appointment consultation");
    }

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

router.get("/load-user-appointment-consultations/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
 
  try {
    const user = await User.findOne({ email: userEmail });
    const consultations = await Consultation.find({ _user: user._id }).select(["-__v"]).populate({
      path: "_doctor",
      select: "firstname lastname specialization consultationPrice"
    });
    
    if (!user || !consultations) return res.status(400).send("something went wrong on loading the consultations");
    
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [user load appointment consultation]");
  }
});

router.get("/load-doctor-appointment-consultations/:doctorEmail", async (req, res) => {
  const doctorEmail = req.params.doctorEmail;
  
  try {
    const doctor = await Doctor.findOne({ email: doctorEmail });
    const consultations = await Consultation.find({ _doctor: doctor._id }).select(["-__v"]).populate({
      path: "_user",
      select: "firstname lastname"
    });
   
    if (!doctor || !consultations){
      return res.status(400).send("something went wrong on loading the consultations");
    } 
   
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [doctor load appointment consultation]");
  }
});

router.get("/load-all-appointment-consultations", async (req, res) => {
  try {
    const consultations = await Consultation.find().select(["-__v"]).sort({ creationDate: "asc" }).populate({
      path: "_user",
      select: "firstname lastname"
    }).populate({
      path: "_doctor",
      select: "firstname lastname specialization consultationPrice"
    });
   
    if (!consultations){
      return res.status(400).send("something went wrong on loading the consultations");
    } 
   
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load all appointment consultation]");
  }
});

router.delete("/remove-appointment-consultation/:consultationId", async (req, res) => {
  const consultationId = req.params.consultationId;
  
  try {
    const consultation = await Consultation.findById(consultationId);
    
    if (consultation.active) {
      return res.status(400).json({ errors: [{ msg: "You cannot delete consultation if it is not canceled or finished"}] });
    } 
    
    const consultationRemoved = await Consultation.findOneAndDelete({ _id: consultationId });
    
    if (!consultationRemoved) {
      return res.status(400).send("something went wrong on removing the consultation");
    }
    
    res.status(200).json(consultationRemoved);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [remove appointment consultation]");
  }
});

router.put("/cancel-appointment-consultation/:consultationId", async (req, res) => {
  const consultationId = req.params.consultationId;
  
  try {
    const consultation = await Consultation.findById(consultationId);
    
    if (!consultation) {
      return res.status(400).json({ errors: [{ msg: "Consultation doesn't exist anymore"}] });
    }
   
    if (!consultation.active) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled or finished"}] });
    }
   
    if (consultation.finished) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already finished"}] });
    }
   
    if (consultation.canceled) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled"}] });
    }
   
    const consultationUpdate = await Consultation.findOneAndUpdate(
      { _id: consultationId },
      { canceled: true, active: false },
      { new: true }
    );
   
    if (!consultationUpdate) {
      return res.status(400).send("something went wrong on updating the consultation");
    }
   
    res.status(200).json(consultationUpdate); 
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update appointment consultation]");
  }
});

router.put("/cancel-appointment-consultation-doctor/:consultationId", async (req, res) => {
  const consultationId = req.params.consultationId;
  try {
    const consultation = await Consultation.findById(consultationId);
  
    if (!consultation) {
      return res.status(400).json({ errors: [{ msg: "Consultation doesn't exist anymore"}] });
    }
  
    if (!consultation.active) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled or finished"}] });
    }
  
    if (consultation.finished) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already finished"}] });
    }
  
    if (consultation.canceled || consultation.canceledByDoctor) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled"}] });
    }
  
    const consultationUpdate = await Consultation.findOneAndUpdate(
      { _id: consultationId },
      { canceledByDoctor: true, active: false },
      { new: true }
    );
  
    if (!consultationUpdate) {
      return res.status(400).send("something went wrong on updating the consultation");
    }
    
    res.status(200).json(consultationUpdate); 
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update appointment consultation]");
  }
});

router.put("/finish-appointment-consultation/:consultationId", async (req, res) => {
  const consultationId = req.params.consultationId;
  try {
     const consultation = await Consultation.findById(consultationId);

     if (!consultation) {
      return res.status(400).json({ errors: [{ msg: "Consultation doesn't exist anymore"}] });
    }
  
    if (!consultation.active) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled or finished"}] });
    }
  
    if (consultation.finished) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already finished"}] });
    }
  
    if (consultation.canceled || consultation.canceledByDoctor) {
      return res.status(400).json({ errors: [{ msg: "Consultation was already canceled"}] });
    }

    const consultationUpdate = await Consultation.findOneAndUpdate(
      { _id: consultationId },
      { finished: true, active: false },
      { new: true }
    );
  
    if (!consultationUpdate) {
      return res.status(400).send("something went wrong on updating the consultation");
    }
    
    res.status(200).json(consultationUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [finish appointment consultation]");
  }
});

module.exports = router;