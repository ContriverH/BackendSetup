const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // using this library we can have access to our filesystem
const Book = require("../models/book");
const Author = require("../models/author");
const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"]; // these are the file types that we are accepted
const upload = multer({
  // this callback function is going to configure multer to be used for our product
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
    // first parameter is for error and second is to tell whether our file is acceted or our file is not accepted
  },
});

// All books route
router.get("/", async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }

  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore); // here lte means less than or equal to
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter); // here gte means greater than or equal to
  }

  try {
    const books = await query.exec(); // this is just going to execute our query
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// new books route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book()); // we are not passing the hasError becuase we are never going to have an error message on this page.
});

// create books route
router.post("/", upload.single("cover"), async (req, res) => {
  // here upload.single('cover') is telling our multer that we are uploading a single file with the name of 'cover'.
  // upload() is going to do all the work behind the scene to create that file upload it to the server into the folder that we have specified.
  // this libraray is also going to store a variable to our req which is called file.

  const fileName = req.file != null ? req.file.filename : null;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImage: fileName,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`);
    res.redirect(`books`);
  } catch {
    if (book.coverImage != null) removeBookCover(book.coverImage);
    renderNewPage(res, book, true);
  }
});

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({}); // .find({}) means fetch everything from the Author model
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) params.errorMessage = "Error creating book";
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

module.exports = router;
