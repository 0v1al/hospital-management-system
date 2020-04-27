const express = require("express");
const router = express.Router();
const Notification = require("../../models/Notification");

router.post("/add-notification-patient", async (req, res) => {
  const { patientId, message } = req.body;

  try {
    const notification = new Notification({
      _patient: patientId,
      forUser: true,
      message: message
    });

    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add notification patient]");
  }
});

router.post("/add-notification-doctor", async (req, res) => {
  const { doctorId, message } = req.body;

  try {
    const notification = new Notification({
      _doctor: doctorId,
      forDoctor: true,
      message: message
    });

    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add notification doctor]");
  }
});

router.get("/load-notifications-patient/:patientId", async (req, res) => {
  const { patientId } = req.params.patientId;

  try {
    const notifications = await Notification.find({ _patient: patientId }).sort({ date: "asc" }).select(["-__v"]);

    if (!notifications) {
      return res.status(400).json({ errors: [{ msg: "no norifications" }] });
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load notification patient]");
  }
});

router.get("/load-notifications-doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params.doctorId;

  try {
    const notifications = await Notification.find({ _doctor: doctorId }).sort({ date: "asc" }).select(["-__v"]);

    if (!notifications) {
      return res.status(400).json({ errors: [{ msg: "no notifications" }] });
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load notification doctor]");
  }
});

router.delete("/delete-notification-patient/:notificationId", async (req, res) => {
  const { notificationId } = req.params.notificationId;

  try {
    const notificationDelete = await Notification.findOneAndDelete({ _id: notificationId });

    if (!notificationDelete) {
      return res.status(400).send("something went wrong on deleting notification");
    }

    res.status(200).json(notificationDelete._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notification patient]");
  }
});

router.delete("/delete-notification-doctor/:notificationId", async (req, res) => {
  const { notificationId } = req.params.notificationId;

  try {
    const notificationDelete = await Notification.findOneAndDelete({ _id: notificationId });

    if (!notificationDelete) {
      return res.status(400).send("something went wrong on deleting notification doctor");
    }

    res.status(200).json(notificationDelete._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notification doctor]");
  }
});

router.put("/mark-view-notification-patient", async (req, res) => {
  const { notificationId } = req.body;

  try {
    const notificationUpdate = await Notification.findOneAndUpdate(
      { _id: notificationId },
      { viewByPatient: true },
      { new: true }
    );

    if (!notificationUpdate) {
      return res.status(400).send("something went wrong on update notification");
    }

    res.status(200).json(notificationUpdate._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update notification patient]");
  }
});


router.put("/mark-view-notification-patient", async (req, res) => {
  const { notificationId } = req.body;

  try {
    const notificationUpdate = await Notification.findOneAndUpdate(
      { _id: notificationId },
      { viewByDoctor: true },
      { new: true }
    );

    if (!notificationUpdate) {
      return res.status(400).send("something went wrong on update notification");
    }

    res.status(200).json(notificationUpdate._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update notification doctor]");
  }
});

router.delete("/delete-notifications-patient/:patientId", async (req, res) => {
  const { patientId } = req.params.patientId;  
  const dateCheck = Math.abs(new Date() - 1000 * 60 * 60 * 24 * 7);

  try {
    const notifications = await Notification.deleteMany(
      { _patient: patientId, viewByPatient: true },
      { date: { $ls: dateCheck } },
      { new: true }
    );
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notification doctor]");
  }
});

router.delete("/delete-notifications-doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params.doctorId;  
  const dateCheck = Math.abs(new Date() - 1000 * 60 * 60 * 24 * 7);

  try {
    const notifications = await Notification.deleteMany(
      { _doctor: doctorId, viewByDoctor: true },
      { date: { $ls: dateCheck } },
      { new: true }
    );
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notification doctor]");
  }
});

module.exports = router;