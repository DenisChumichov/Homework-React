const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  columnId: {}
});

module.exports = mongoose.model("Card", cardSchema);