const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors route
// since in the server.js using the command-> use("./authors"),  so we can directly start writing from / while specifing the route
router.get("/", async (req, res) => {
  res.render("authors/index"); // authors/index.ejs is the file location
  try {
    const authors = await Author.find({});
    res.render("authors/index", { authors: authors });
  } catch {
    res.redirect("/");
  }
});

// new authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() }); // here the author model is passed to the new page and then we can manipulte it from there.
});

// create authors route
// its working starts on getting the post request and most probabily from the forms.
router.post("/", async (req, res) => {
  const author = new Author({ name: req.body.name });
  // we need to make sure that we do not pass the whole body inside the new Author() object. This is because body may have id in it, which will change the id we have already assigned. This will make unwanted changes to the model. So, to avoid that we will accept and pass only the attribute that we need to change or modify in the model.

  try {
    const newAuthor = await author.save();
    // res.redirect(`authors /${newAuthor.id}`); we will use it when we create the newAuthor page
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author, // in case if the user has entered the name of the author, so he does not have to enter it again.
      errorMessage: "Error creating Author",
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render("authors/new", {
  //       author: author, // in case if the user has entered the name of the author, so he does not have to enter it again.
  //       errorMessage: "Error creating Author",
  //     });
  //   } else {
  //     // res.redirect(`authors /${newAuthor.id}`); we will use it when we create the newAuthor page
  //     res.redirect(`authors`);
  //   }
  // });
});

module.exports = router;
