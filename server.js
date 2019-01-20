//------------------------------------------------------
//Create an instances of express, body-parser an path
//-------------------------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// get the instance PORT for live and local developing
var PORT = process.env.PORT || 8080;

//store express into a variable
var app = express();

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for style sheet from the "public" directory in the application directory.
app.use(express.static(__dirname + '/app/public/style'));


// Import routers and give the server access to them.
var api_router = require("./app/routing/apiRoutes.js");
var html_router = require("./app/routing/htmlRoutes.js");

app.use(api_router);
app.use(html_router);


//express listening to the PORT
app.listen(PORT, function() {
  console.log("Server is up and running on  " + PORT);
});
