const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  message: String,
  _patient: {
    type: Schema.ObjectId,
    ref: "patients"
  },
  _doctor: {
    type: Schema.ObjectId,
    ref: "doctors"
  },
  forUser: {
    type: Boolean,
    default: false
  },
  forDoctor: {
    type: Boolean,
    default: false
  },
  viewByPatient: {
    type: Boolean,
    default: false
  },
  viewByDoctor: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model("notifications", NotificationSchema);
module.exports = Notification;