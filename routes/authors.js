const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// All authors route
// since in the server.js using the command-> use("./authors"),  so we can directly start writing from / while specifing the route
router.get("/", async (req, res) => {
  let searchOptions = {}; // this is to store the search results.
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // here i means case-insensitive and RegExp is used to start serach with even the smallest matching part of the name string.
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query, // this is to send back the request to the user so that you can repopulate the filds in the index page.
    }); // authors/index.ejs is the file location
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
    res.redirect(`authors/${newAuthor.id}`);
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

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render("authors/show", {
      author: author,
      booksByAuthor: books,
    });
  } catch {
    res.redirect("/");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id); // findById() is a method provided by the mongoose library
    res.render("authors/edit", { author: author });
  } catch {
    res.render("/authors");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating Author",
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove(); // this remove() method is provided by mongoose
    res.redirect("/authors");
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
