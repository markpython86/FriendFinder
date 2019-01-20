var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// Import the model (friends.js) to use its functions.
var actions = require("../data/friends.js");


// Create all our routes and set up logic within those routes where required.
app.get("/api/friends", function(req, res) {
  res.send(actions.getFriends());
});

app.post("/api/friends", function(req, res) {
  var name = "";
  var imgURL = "";
  var scores = [];
  //loop throught the user choices and store it in the variables above
  for (var i = 0; i < req.body.length; i++) {
    //validation to make sure to store the name into the name variable
    if (req.body[i].name === "name") {
      name = req.body[i].value;
      //making sure the image link stored in the imgURL variable
    } else if (req.body[i].name === "imgURL") {
      imgURL = req.body[i].value;
    } else {
      //push the scores into the scores empty array
      scores.push(req.body[i].value);
    }
  }

//storing data for the closest friend and send it to the model
  var closestFriend = calculateClosestFriend(scores);

  var friendVar = actions.addAFriend(name, imgURL, scores);

//store the colsest friend into a variable to send
  var responseJSON = {
    closest: closestFriend.name,
    photo: closestFriend.url
  };
  //send JSON response  
  res.json(responseJSON);
});

//calculating the result between the current user and the JSON data
function calculateClosestFriend(scores) {
  var friends = actions.getFriends();
  var minDiff = Number.MAX_SAFE_INTEGER;
  var matchFriendName = {
    name: "",
    url: ""
  };
  //loop through the whole JSON repsonse and find the lowest result from subtraction
  //then store it to the matchFriendName object variable
  for (var i = 0; i < friends.length; i++) {
    //see the results in the console
    console.log("**************************");
    console.log(friends[i].scores);
    console.log(scores);
    console.log("**************************");
    var diffCurrent = calculateDelta(friends[i].scores, scores);
    //if the diffCurrent result is less than the minDiff make the diffCurrent the new minDiff
    if (diffCurrent < minDiff) {
      minDiff = diffCurrent;
      matchFriendName.name = friends[i].name;
      matchFriendName.url = friends[i].imgURL;
    }
  }
  //if not return the last result
  return matchFriendName;
}

//subtract the 2 arrays
function calculateDelta(scores1, scores2) {
  var diff = 0;
  for (var i = 0; i < scores1.length; i++) {
    diff += Math.abs(scores1[i] - scores2[i]);
  }
  return diff;
}


// Export routes for server.js to use.
module.exports = app;
