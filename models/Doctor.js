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
  consultationPrice: String,
  loginTime: Date,
  logoutTime: Date,
  data: {
    type: Date,
    default: Date.now
  }
});

const Doctor = mongoose.model("doctors", DoctorSchema);
module.exports = Doctor;