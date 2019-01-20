var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();


// Create all our routes and set up logic within those routes where required.
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/css/:id", function(req, res) {
  var id = req.params.id;
  res.sendFile(path.join(__dirname, "../public/style/" + id));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});


// Export routes for server.js to use.
module.exports = app;
