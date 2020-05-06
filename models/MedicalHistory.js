const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalHistorySchema = new Schema({
  _patient: {
    type: Schema.ObjectId,
    ref: "patients"
  },
  bloodPressure: String,
  bloodSugar: String,
  bodyTemperature: String,
  weight: String,
  prescription: String,
  deleteDoctor: {
    type: Boolean,
    default: false
  },
  deletePatient: {
    type: Boolean,
    default: false
  },
  doctorFullname: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const MedicalHistory = mongoose.model("medicalhistories", MedicalHistorySchema);
module.exports = MedicalHistory;