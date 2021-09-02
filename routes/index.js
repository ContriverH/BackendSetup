const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  //   res.send("Hello World");
  let books;
  try {
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec(); // we want to limit our serach only to the the top ten, because we want to show the recently added books.
  } catch {
    books = [];
  }
  res.render("index", { books: books }); // It will render the file in the views
}); // this alone is not going to run the server at this route. This is because the server does not know unless we require it in the server.js file and let it know that this route exists

module.exports = router; // this is the way to export any variable
