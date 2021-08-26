const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
}); // this alone is not going to run the server at this route. This is because the server does not know unless we require it in the server.js file and let it know that this route exists
