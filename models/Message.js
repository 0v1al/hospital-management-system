const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String, 
  email: String, 
  contact: String, 
  message: String,
  read: Boolean,
  response: String,
  updateDate: Date,
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;