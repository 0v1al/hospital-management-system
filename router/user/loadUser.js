const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authorization = require("../../middlewares/authorization");

router.get("/load-user", authorization, async (req, res) => {
  const user = req.user;
  try {
    const userLoaded = await User.findById(user.id).select(["-password", "-data", "-__v"]);
    if (!userLoaded) return res.status(400).send("somthing went wrong on loading the user");
    res.status(200).json(userLoaded);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("server error [loading user]");
  }
});

router.get("/load-users", authorization, async (req, res) => {
  try {
    const usersLoaded = await User.find().select(["-password", "-_id", "-__v"]);
    if (!usersLoaded) return res.status(400).send("somthing went wrong on loading users");
    res.status(200).json(usersLoaded);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("server error [loading users]");
  }
});

module.exports = router;