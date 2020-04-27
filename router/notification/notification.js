const express = require("express");
const router = express.Router();
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const Notification = require("../../models/Notification");

router.post("/add-notification-patient", async (req, res) => {

});

router.post("/add-notification-doctor", async (req, res) => {

});

router.get("/load-notifications-patient", async (req, res) => {

});

router.get("/load-notifications-doctor", async (req, res) => {

});

router.delete("/delete-notification-patient", async (req, res) => {

});

router.delete("/delete-notification-doctor", async (req, res) => {

});

router.put("/mark-view-notification-doctor", async (req, res) => {

});


router.put("/mark-view-notification-patient", async (req, res) => {

});

module.exports = router;