const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpecializationSchema = new Schema({
  specialization: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: Date
});

const Specialization = mongoose.model("specializations", SpecializationSchema);
module.exports = Specialization;