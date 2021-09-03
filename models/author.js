const mongoose = require("mongoose");
const book = require("./book");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// this is done because we dont want to delete any author which is already associated with any book
// mongoose has ways for us to run the code before or after or duing certain code
// pre will allow us to run a method before a certain action occurs
authorSchema.pre("remove", function (next) {
  // this will allow us to run any action before we remove any author from our database
  // here next is a callback
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error("This author is still having the books assigned"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Author", authorSchema); // here "Author is the name given to the table created."
// now we can import this model wherever we want to use it.
