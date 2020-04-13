const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Message = require("../../models/Message");

router.post("/contact-add-message", [
  check("name", "you need to add a name").trim().escape().not().isEmpty(),
  check("email", "you need to add a valid email").isEmail(),
  check("contact", "you need to add a number").trim().escape().not().isEmpty(),
  check("message", "you need to add a message").trim().escape().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, contact, message } = req.body;
    const newContactMessage = await new Message({
      name, 
      email, 
      contact,
      message
    });

    await newContactMessage.save();
    res.status(200).json(newContactMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add message]");
  }
});

router.delete("/remove-message/:idMessage", async (req, res) => {
  const idMessage = req.params.idMessage;
  try {
    const messageDeleted = await Message.findOneAndDelete({ _id: idMessage});
    if (!messageDeleted) {
      return res.status(400).send("something wrong on deleting the message");
    }
    res.status(200).json(messageDeleted);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [remove message]");
  }
});

router.get("/load-message/:idMessage", async (req, res) => {
  const idMessage = req.params.idMessage;
  try {
    const message = await Message.findById(idMessage);
    if (!message) {
      return res.status(400).send("something wrong on loading the message");
    }
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load message]");
  }
});

router.get("/load-messages", async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages) {
      return res.status(400).send("something wrong on loading the messages");
    }
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load messages]");
  }
});

router.put("/update-message/:idMessage", [
  check("response", "you need to add e response message").trim().escape().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const idMessage = req.params.idMessage;
  const { response } = req.body; 
  try {
    const updateMessage = await Message.findOneAndUpdate(
      { _id: idMessage},
      { response: response, updateDate: new Date() }, 
      { new: true }
    );
    if (!updateMessage) {
      return res.status(400).send("something went wrong on update the message");
    }

    res.status(200).json(updateMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update message]");
  }
});

router.put("/mark-read-message/:idMessage", async (req, res) => {
  const idMessage = req.params.idMessage;
  try {
    const message = await Message.findById(idMessage);
    if (message.read) {
      return res.status(400).json({ errors: [{ msg: "The message was already marked as read" }] });
    }
    const updateMessage = await Message.findOneAndUpdate(
      { _id: idMessage},
      { updateDate: new Date(), read: true }, 
      { new: true }
    );
    if (!updateMessage) {
      return res.status(400).send("something went wrong on marking as read the message");
    }

    res.status(200).json(updateMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [marking as read message]");
  }
});

module.exports = router;