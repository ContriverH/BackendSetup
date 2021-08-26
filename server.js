const express = require("express");
const app = express(); // to get the app portion of express
const expressLayouts = require("express-ejs-layouts");

// configuring our express application
app.set("view engine", "ejs"); // we want to set the view engine as ejs
app.set("views", __dirname + "/views"); // we need to tell where our views are going to come from. For that we need to set a folder where all of the different view are going to go for our server.
app.set("layout", "layouts/layout"); // we can tell how our layout files are going to be
// the idea behind the layour files is that every single file is going to be put inside of this layout file, so that we don't have to duplicate all the begining and ending html of the project such as header and footer
app.use(expressLayouts); // tell node that we want to use the expressLayouts
app.use(express.static("public")); // this will tell where our public files are going to be like, stylesheets, js files, images

app.listen(process.env.PORT || 3000); // this is going to pull the port from the enviornment variable, the server is going to tell what source it is listening to but for the development purposes we assign a port number by ourselves since the server is not telling anything, so we set the port to 3000
