const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");

router.post("/add-patient/:doctorId", [
  check("firstname", "You need to add the firstname").trim().escape().not().isEmpty(),
  check("lastname", "You need to add the lastname").trim().escape().not().isEmpty(),
  check("email", "You need to add a valid email").isEmail(),
  check("age", "You need to add the age").trim().escape().not().isEmpty(),
  check("contact", "You need to add the contact number").trim().escape().not().isEmpty(),
  check("address", "You need to add the address").trim().escape().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const doctorId = req.params.doctorId;
  const { firstname, lastname, email, age, contact, address, male, female, medicalHistory } = req.body;

  if (!male && !female) {
    return res.status(400).json({ errors: [{ msg: "You need to select a gender" }] });
  }

  try {
    const emailAlready = await Patient.findOne({ email: email });
    
    if (emailAlready) {
      return res.status(400).json({ errors: [{ msg: "A patient with that email already exist" }] });
    }

    const newPatient = new Patient({
      firstname: firstname,
      lastname: lastname,
      email: email,
      age: age,
      contact: contact,
      address: address,
      male: male,
      female: female,
      medicalHistory: medicalHistory,
      consultationActive: true
    });
    newPatient._doctor.push(doctorId);
    await newPatient.save(error => error ? console.log(error) : null);
    res.status(200).json(newPatient);
  } catch (err) {
    console.err(err);
    res.status(500).send("server error [add patient]");
  }
});

router.get("/load-patients/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const patients = await Patient.find({ _doctor: doctorId }).select(["-__v"]).sort({ firstname: "asc", lastname: "asc" });
   
    if (!patients) {
      return res.status(400).send("something went wrong at loading the patients");
    }
   
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load patients");
  }
});


router.get("/load-patient/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const patient = await Patient.findById(patientId).select(["-__v"]);
   
    if (!patient) {
      return res.status(400).send("something went wrong at loading the patients");
    }
   
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load patient");
  }
});

router.put("/update-patient/:patientEmail", [
  check("firstname", "You need to add the firstname").trim().escape().not().isEmpty(),
  check("lastname", "You need to add the lastname").trim().escape().not().isEmpty(),
  check("email", "You need to add a valid email").isEmail(),
  check("age", "You need to add the age").trim().escape().not().isEmpty(),
  check("contact", "You need to add the contact number").trim().escape().not().isEmpty(),
  check("address", "You need to add the address").trim().escape().not().isEmpty()
], async (req, res) => {
  const patientEmail = req.params.patientEmail;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, age, contact, address, male, female, medicalHistory } = req.body;

  if (!male && !female) {
    return res.status(400).json({ errors: [{ msg: "You need to select a gender" }] });
  }

  try {
    if (patientEmail !== email) {
      const emailAlready = await Patient.findOne({ email: email });

      if (emailAlready) {
        return res.status(400).json({ errors: [{ msg: "A patient with that email already exist" }] });
      }
    }

    const patientUpdate = await Patient.findOneAndUpdate(
      { email: patientEmail },
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        age: age,
        contact: contact,
        address: address,
        male: male,
        female: female,
        medicalHistory: medicalHistory,
        updateDate: new Date()
      },
      { new: true }
    ).select(["-__v"]);

    if (!patientUpdate) {
      return res.status(400).send("something went wrong on updating the patient");
    }

    res.status(200).json(patientUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update patient");
  }
});

router.delete("/remove-patient/:patientId/:doctorId", async (req, res) => {
  const patientId  = req.params.patientId;
  const doctorId = req.params.doctorId;
  try {
    const patient = await Patient.findById(patientId);
   
    if (!patient) {
      return res.status(400).send("something went wrong on deleting the patient");
    }

    if (patient.consultationActive) {
      return res.status(400).json({ errors: [{ msg: "You need to finish the consultation of the patient first" }] });
    }

    if (patient._doctor.length <= 1) {
      const patientDeleted = await Patient.findOneAndDelete({ _id: patientId });
      return res.status(200).json(patientDeleted);
    }
   
    patient._doctor.pull({ _id: doctorId });
   
    res.status(200).json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error [remove patient");
  }
});

router.post("/search-patient", [
  check("patientEmail", "You need to ad a valid email").isEmail()
], async (req, res) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { patientEmail } = req.body;
    const patient = await Patient.findOne({ email: patientEmail }).select(["-__v"]);
    
    if (!patient) {
      return res.status(400).json({ errors: [{ msg: "No patient with this email was found"} ] });
    }
    
    res.status(200).json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error [search patient]");
  }
}); 

router.put("/change-password-doctor", [
  check("password", "You need to add your current password").trim().escape().not().isEmpty(),
  check("newPassword", "You need to add your new password").trim().escape().not().isEmpty(),
  check("repeatNewPassword", "You need to add your repeat password").trim().escape().not().isEmpty()
], async (req, res) => {
  const { password, newPassword, repeatNewPassword, email } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (password === newPassword ) {
    return res.status(400).json({ errors: [{ msg: "your new password must be different" }] });
  }

  try {
    const doctor = await Doctor.findOne({ email: email, password: password });
    
    if (!doctor) {
      return res.status(400).json({ errors: [{ msg: "Your current password is not correct" }] });
    }

    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ errors: [{ msg: "The passwords doesn't match" }] });
    }

    const doctorUpdate = await Doctor.findOneAndUpdate(
      { email: email },
      { password: newPassword },
      { new: true }
    );
    await doctorUpdate.save(err => err && console.log(err));
    res.status(200).json(doctorUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [change password doctor]");
  }
});

router.put("/update-profile-doctor/:doctorEmail", [
  check("firstname", "you need to add your firstname").trim().escape().not().isEmpty(),
  check("lastname", "you need to add your lastname").trim().escape().not().isEmpty(),
  check("address", "you need to add your address").trim().escape().not().isEmpty(),
  check("consultationPrice", "you need to add your consultation price").trim().escape().not().isEmpty(),
  check("contact", "you need to add your contact number").trim().escape().not().isEmpty(),
  check("email", "you need to add a valid email").trim().isEmail()
], async (req, res) => {
  const doctorEmail = req.params.doctorEmail;
  const { firstname, lastname, address, consultationPrice, contact, email } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    if (doctorEmail !== email) {
      const emailAlready = await Doctor.findOne({ email: email });
      
      if (emailAlready) {
        return res.status(400).json({ errors: [{ msg: "A doctor with this email already exist" }] });
      }
    }

    const doctorUpdate = await Doctor.findOneAndUpdate(
      { email: doctorEmail },
      { 
        firstname: firstname, 
        lastname: lastname, 
        address: address, 
        consultationPrice: consultationPrice, 
        contact: contact, 
        email: email 
      },
      { new: true }
    );
    await doctorUpdate.save(err => err && console.log(err));
    res.status(200).json(doctorUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [change profile doctor]");
  }
});

module.exports = router;