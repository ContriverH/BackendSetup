const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send("Hello World");
  res.render("index"); // It will render the file in the views
}); // this alone is not going to run the server at this route. This is because the server does not know unless we require it in the server.js file and let it know that this route exists

module.exports = router; // this is the way to export any variable
