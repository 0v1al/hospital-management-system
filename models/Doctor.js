const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  firstname: String, 
  lastname: String, 
  email: String, 
  address: String,
  password: String,
  contact: String,
  specialization: String,
  data: {
    type: Date,
    default: Date.now
  }
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;