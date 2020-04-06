const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const authorization = require("../../middlewares/authorization");

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

module.exports = router;