var friends = [];

function Friend(name, imgURL, scores) {
  this.name = name;
  this.imgURL = imgURL;
  this.scores = scores;
}
var actions = {
  addAFriend: function(name, imgURL, scores) {
    var friendVar = new Friend(name, imgURL, scores);
    // console.log(friendVar);
    friends.push(friendVar);
    return friendVar;
  },
  getFriends: function() {
    return friends;
  }
};

module.exports = actions;
