const express = require("express");
const router = express.Router();
const Doctor = require("../../models/Doctor");
const authorization = require("../../middlewares/authorization");

router.get("/load-doctor", authorization, async (req, res) => {
  const user = req.user;
  try {
    const doctor = await Doctor.findById(user.id).select(["-password", "-__v"]);
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error [load doctor]");
  }
});

module.exports = router;