const express = require("express");
const router = express.Router();
const Notification = require("../../models/Notification");
const Doctor = require("../../models/Doctor");
const authorization = require("../../middlewares/authorization");

router.post("/add-notification-user", authorization, async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = new Notification({
      _user: userId,
      forUser: true,
      message: message
    });

    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add notification user]");
  }
});

router.post("/add-notification-doctor", authorization, async (req, res) => {
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

router.get("/load-notifications-user/:userId", authorization, async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await Notification.find({ _user: userId, forUser: true }).sort({ date: "desc" }).select(["-__v"]);

    if (!notifications) {
      return res.status(200).json({ errors: [{ msg: "no notifications" }] });
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load notification user]");
  }
});

router.get("/load-notifications-doctor/:doctorId", authorization, async (req, res) => {
  const doctorId  = req.params.doctorId;

  try {
    const notifications = await Notification.find({ _doctor: doctorId, forDoctor: true }).sort({ date: "desc" }).select(["-__v"]);

    if (!notifications) {
      return res.status(200).json({ errors: [{ msg: "no notifications" }] });
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [load notification doctor]");
  }
});

router.put("/mark-view-notifications-user", authorization, async (req, res) => {
  const { userId } = req.body;
  
  try {
    const notificationsUpdate = await Notification.updateMany(
      { _user: userId, forUser: true, viewByUser: false },
      { viewByUser: true },
      { new: true }
    );

    if (!notificationsUpdate) {
      return res.status(400).send("something went wrong on update notification");
    }

    res.status(200).json(userId);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update notification patient]");
  }
});


router.put("/mark-view-notifications-doctor", authorization, async (req, res) => {
  const { doctorId } = req.body;

  try {
    const notificationUpdate = await Notification.updateMany(
      { _doctor: doctorId, viewByDoctor: false, forDoctor: true },
      { viewByDoctor: true },
      { new: true }
    );

    if (!notificationUpdate) {
      return res.status(400).send("something went wrong on update notification");
    }

    res.status(200).json(doctorId);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [update notification doctor]");
  }
});

router.delete("/delete-notifications-user/:userId", authorization, async (req, res) => {
  const userId = req.params.userId;  
  try {
    await Notification.deleteMany(
      { _user: userId, viewByUser: true, forUser: true },
    );
    const notifications = await Notification.find({ _user: userId, forUser: true }).sort({ date: "desc" }).select(["-__v"]);
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notifications user]");
  }
});

router.delete("/delete-notifications-doctor/:doctorId", authorization, async (req, res) => {
  const doctorId  = req.params.doctorId;  
  try {
     await Notification.deleteMany(
      { _doctor: doctorId, viewByDoctor: true, forDoctor: true },
    );
    const notifications = await Notification.find({ _doctor: doctorId, forDoctor: true }).sort({ date: "desc" }).select(["-__v"]);
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [delete notifications doctor]");
  }
});

router.get("/number-user-notifications/:userId", authorization, async (req, res) => {
  const userId = req.params.userId;

  try {
    const userNotificationsNumber = await Notification.find({ _user: userId, forUser: true, viewByUser: false }).countDocuments();
    res.status(200).json(userNotificationsNumber);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [get user notifications");
  }
});

router.get("/number-doctor-notifications/:doctorId", authorization, async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const doctorNotificationsNumber = await Notification.find({ _doctor: doctorId, forDoctor: true, viewByDoctor: false }).countDocuments();
    res.status(200).json(doctorNotificationsNumber);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [get doctor notifications");
  }
});

router.post("/add-notification-doctor-by-email", authorization, async (req, res) => {
  const { doctorEmail, message } = req.body;

  try {
    const doctor = await Doctor.findOne({ email: doctorEmail});
    const notification = new Notification({
      _doctor: doctor._id,
      forDoctor: true,
      message: message
    });

    await notification.save();
    res.status(200).json(notification); 
  } catch (err) {
    console.error(err);
    res.status(500).send("server error [add notification doctor by email]");
  }
});

module.exports = router;