const express = require("express");
const router = express.Router();
const Patient = require("../../models/Patient");
const authorization = require("../../middlewares/authorization");

router.get("/load-patient", authorization, async (req, res) => {
  const user = req.user;
  try {
    const userLoaded = await Patient.findById(user.id).select(["-password"]);
    res.status(200).json(userLoaded);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error [register patient]");
  }
});

module.exports = router;