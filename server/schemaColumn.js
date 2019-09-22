const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Column", columnSchema);