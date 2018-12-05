const friendList = require('../data/friends');
const friendArr = friendList.friends;

const API = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friendArr);
  });

  // Posts survey results
  app.post('/api/friends', function(req, res) {
    let diffArr = [];
    let friendDiff = 0;
    //
    // For each friend
    for (let i=0; i < friendArr.length; i++) {
      // For each score of friend
      for (let j=0; j < req.body.scores.length; j++) {
        let diff = Math.abs(friendArr[i].scores[j]-req.body.scores[j]);
        // Add score difference to a total value
        friendDiff += diff;
      }
      // Push total value into array
      diffArr.push(friendDiff);
      friendDiff = 0;
    }

    let lowestDiff = Math.min(...diffArr);
    let friendIndex = diffArr.indexOf(lowestDiff);
    res.send(friendArr[friendIndex]);
  });
};

module.exports = API;
