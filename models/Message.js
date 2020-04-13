const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String, 
  email: String, 
  contact: String, 
  message: String,
  read: {
    type: Boolean,
    default: false
  },
  response: {
    type: String,
    default: ""
  },
  updateDate: Date,
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("messages", MessageSchema);
module.exports = Message;