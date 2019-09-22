const mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.connect(
  //"mongodb://localhost/mongoose",
  'mongodb://localhost:27017/kanban',
  {
    keepAlive: 1,
    poolSize: 5,
    useNewUrlParser: true
  }
);

module.exports = mongoose