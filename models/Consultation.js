const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
  _user: {
    type: Schema.ObjectId,
    ref: "users"
  },
  _doctor: {
    type: Schema.ObjectId,
    ref: "doctors"
  },
  consultationDate: Date,
  time: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  canceled: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
  canceledByDoctor: {
    type: Boolean,
    default: false
  }
});

const Consultation = mongoose.model("consultations", ConsultationSchema);
module.exports = Consultation;