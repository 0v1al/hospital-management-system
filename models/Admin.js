const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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

const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;