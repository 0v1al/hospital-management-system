const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  firstname: String, 
  lastname: String, 
  email: String, 
  location: String,
  password: String,
  data: {
    type: Date,
    default: Date.now
  }
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;