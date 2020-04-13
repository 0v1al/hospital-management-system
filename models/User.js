const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String, 
  lastname: String, 
  email: String, 
  location: String,
  password: String,
  loginTime: Date,
  logoutTime: Date,
  data: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;