const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema); // here "Author is the name given to the table created."
// now we can import this model wherever we want to use it.
