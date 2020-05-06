const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  _doctor: [
    {
      type: Schema.ObjectId,
      consultationActive: Boolean,
      ref: "doctors"
    }
  ],
  _user: {
    type: Schema.ObjectId,
    ref: "users"
  },
  firstname: String,
  lastname: String,
  address: String,
  male: Boolean,
  female: Boolean,
  email: String,
  age: String,
  contact: String,
  medicalHistory: String,
  consultationActive: Boolean,
  date: {
    type: Date,
    default: Date.now
  },
  updateDate: Date
});

const Patient = mongoose.model("patients", PatientSchema);
module.exports = Patient;