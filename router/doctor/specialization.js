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

  const { specialization } = req.body;

  try {
    const specializationAlready = await Specialization.findOne({ specialization: specialization });

    if (specializationAlready) {
      return res.status(400).json({ errors: [ { msg: "The specialization is already added!" }] })
    }

    const newSpecialization = new Specialization({
      specialization: specialization
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
    const specializations = await Specialization.find();
    res.status(200).json(specializations);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [load specializations]");
  }
})

module.exports = router;