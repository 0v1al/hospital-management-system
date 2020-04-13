const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const { check, validationResult } = require("express-validator");
const Specialization = require("../../models/Specialization");

router.post("/add-specialization", [authorization, 
  check("specialization", "You need to specify a specialization!").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { specialization } = req.body;
  specialization = specialization.toLowerCase();

  try {
    const specializationAlready = await Specialization.findOne({ specialization: specialization });

    if (specializationAlready) {
      return res.status(400).json({ errors: [ { msg: "The specialization is already added!" }] })
    }

    const newSpecialization = new Specialization({
      specialization: specialization.toLowerCase()
    });

    await newSpecialization.save();
    const specializationData = {
      specialization: newSpecialization.specialization,
      creationDate: newSpecialization.creationDate,
      updateDate: newSpecialization.updateDate ? newSpecialization.updateDate : "" 
    };
    res.status(200).json(specializationData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error [add specialization]");
  }
});

router.get("/load-specializations", authorization, async (req, res) => {
  try {
    const specializations = await Specialization.find().select(["-__v", "-_id"]);
    res.status(200).json(specializations);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [load specializations]");
  }
});

router.delete("/remove-specialization/:specializationName", authorization, async (req, res) => {
  const specializationName = req.params.specializationName.toLowerCase();
  try {
    const result = await Specialization.findOneAndDelete({ specialization: specializationName });
    if (!result) {
      return res.status(400).json({ errors: [{ msg: "Something went wrong on removing the specialization!" }] });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [remove specialization]");
  }
});

router.put("/edit-specialization",[
  check("newSpecialization", "Enter a valid specialization").trim().escape().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let { specialization, newSpecialization } = req.body;
    specialization = specialization.toLowerCase();
    newSpecialization = newSpecialization.toLowerCase();
    console.log(specialization);
    console.log(newSpecialization);
    let alreadyExist = await Specialization.findOne({ specialization: newSpecialization });
   
    if (alreadyExist) {
      return res.status(400).json({errors: [{ msg: "A specialization with this name was already added" }] });
    }

    let editSpecialization = await Specialization.findOneAndUpdate(
      { specialization: specialization },
      { specialization: newSpecialization, updateDate: new Date() },
      { new: true }
    ).select(["-_id", "-__v"]);
    console.log(editSpecialization);
    if (!editSpecialization) {
      return res.status(400).json({ errors: [{ msg: "Something went wrong on editing a specialization" }] });
    }

    res.status(200).json(editSpecialization);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [edit specialization]");
  }
});

module.exports = router;