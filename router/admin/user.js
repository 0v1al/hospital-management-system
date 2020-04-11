const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");
const User = require("../../models/User");

router.delete("/remove-user/:userEmail", authorization, async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const result = await User.findOneAndDelete({ email: userEmail });
    if (!result) {
      return res.status(400).json({ errors: [{ msg: "Something went wrong on removing the user!" }] });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [remove user]");
  }
});

module.exports = router;