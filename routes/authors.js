const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors route
router.get("/", (req, res) => {
  // since in the use("./authors") we have appended the
  res.render("authors/index");
});

// new authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() }); // here the author model is passed to the new page and then we can manipulte it from there.
});

// create authors route
// its working starts on getting the post request and most probabily from the forms.
router.post("/", (req, res) => {
  res.send("Create");
});

module.exports = router;
