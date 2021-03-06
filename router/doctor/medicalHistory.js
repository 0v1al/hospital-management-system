const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const MedicalHistory = require("../../models/MedicalHistory");
const Patient = require("../../models/Patient");

router.post("/add-medical-history", [authorization,
  check("bloodPressure", "please complete all the fields").trim().escape().not().isEmpty(),
  check("bloodSugar", "please complete all the fields").trim().escape().not().isEmpty(),
  check("weight", "please complete all the fields").trim().escape().not().isEmpty(),
  check("bodyTemperature", "please complete all the fields").trim().escape().not().isEmpty(),
  check("prescription", "please complete all the fields").trim().escape().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { patientId, bloodPressure, bloodSugar, weight, bodyTemperature, prescription, doctorFullname } = req.body;
    const medicalHistory = new MedicalHistory({
      _patient: patientId,
      bloodPressure: bloodPressure,
      bloodSugar: bloodSugar,
      weight: weight,
      bodyTemperature: bodyTemperature,
      prescription: prescription,
      doctorFullname: doctorFullname
    });
    await medicalHistory.save(err => err && console.log(err));
    res.status(200).json(medicalHistory);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add medical history]");
  }
});

router.delete("/remove-medical-history-doctor/:medicalHistoryId", authorization, async (req, res) => {
  const medicalHistoryId = req.params.medicalHistoryId;
  try {
    let medicalHistory = await MedicalHistory.findById(medicalHistoryId);
    
    if (!medicalHistory.deleteDoctor) {
      await MedicalHistory.findOneAndUpdate(
        { _id: medicalHistoryId },
        { deleteDoctor: true  }
      );
      medicalHistory = await MedicalHistory.findById(medicalHistoryId); 
    }

    if (medicalHistory.deleteDoctor && medicalHistory.deletePatient) {
      const medicalHistoryDelete = await MedicalHistory.findOneAndDelete({ _id: medicalHistoryId });

      if (!medicalHistoryDelete) {
        return res.status(400).send("something went wrong on deleting medical history");
      }  

      return res.status(200).json(medicalHistoryDelete._id);
    }

    res.status(200).json(medicalHistory._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete medical history]");
  }
});

router.delete("/remove-medical-history-patient/:medicalHistoryId", authorization, async (req, res) => {
  const medicalHistoryId = req.params.medicalHistoryId;
  try {
    let medicalHistory = await MedicalHistory.findById(medicalHistoryId);
    
    if (!medicalHistory.deletePatient) {
      await MedicalHistory.findOneAndUpdate(
        { _id: medicalHistoryId },
        { deletePatient: true }
      );
      medicalHistory = await MedicalHistory.findById(medicalHistoryId); 
    }
   
    if (medicalHistory.deleteDoctor && medicalHistory.deletePatient) {
      const medicalHistoryDelete = await MedicalHistory.findOneAndDelete({ _id: medicalHistoryId });

      if (!medicalHistoryDelete) {
        return res.status(400).send("something went wrong on deleting medical history");
      }

    }
    
    res.status(200).json(medicalHistory._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete medical history]");
  }
});

router.get("/load-medical-histories-by-userId/:userId", authorization, async (req, res) => {
  const userId = req.params.userId;

  try {
    const patient = await Patient.findOne({ _user: userId });
    
    if (!patient) {
      return res.status(400).send("something went wrong on loading medical history");
    }

    const medicalHistories = await MedicalHistory.find({ _patient: patient._id }).sort({ date: "desc" }).select(["-__v"]);
    
    if (!medicalHistories) {
      return res.status(400).send("something went wrong on loading medical history");
    }

    res.status(200).json(medicalHistories);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load medical history]");
  }
});

router.get("/load-medical-histories-by-patientId/:patientId", authorization, async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const medicalHistories = await MedicalHistory.find({ _patient: patientId }).select(["-__v"]).sort({ date: "desc" });
    
    if (!medicalHistories) {
      return res.status(400).send("something went wrong on loading medical history");
    }

    res.status(200).json(medicalHistories);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load medical history]");
  }
});

router.get("/load-all-medical-histories", authorization, async (req, res) => {
  try {
    const medicalHistories = await MedicalHistory.find().select(["-__v"]).sort({ date: "desc" });
    
    if (!medicalHistories) {
      return res.status(400).send("something went wrong on loading medical history");
    }
    
    res.status(200).json(medicalHistories);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load medical history]");
  }
});

router.get("/load-medical-history/:patientId", authorization, async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const medicalHistory = await MedicalHistory.find({ _patient: patientId}).sort({ date: "desc" }).select(["-__v"]).sort({ date: "asc" });
    
    if (!medicalHistory) {
      return res.status(400).send("something went wrong on loading medical history");
    }
    
    res.status(200).json(medicalHistory);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load medical history]");
  }
});

module.exports = router;