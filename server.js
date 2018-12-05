// Packages
const express = require('express');
const path = require('path');
// const friends = require('./app/data/friends.js');
// Express & PORT
const app = express();
const PORT = 3000;
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// data
const friends = [
  {
    'name':'Morty',
    'photo':'https://vignette.wikia.nocookie.net/rickandmorty/images/c/ce/MortyTransparent.png/revision/latest?cb=20160909031949',
    'scores': [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ]
  },
  {
    'name':'Rick',
    'photo':'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg',
    'scores': [
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ]
  }
];

// apiRoutes.html
app.get('/api/friends', function(req, res) {
  res.json(friends);
});

// Posts survey results
app.post('/api/friends', function(req, res) {
  console.log(req.body);
  let diffArr = [];
  let friendDiff = 0;

  // For each friend
  for (let i=0; i < friends.length; i++) {
    // For each score of friend
    for (let j=0; j < req.body.scores.length; j++) {
      let diff = Math.abs(friends[i].scores[j]-req.body.scores[j]);
      // Add score difference to a total value
      friendDiff += diff;
    }
    // Push total value into array
    diffArr.push(friendDiff);
  }

  let lowestDiff = Math.min(...diffArr);
  let friendIndex = diffArr.indexOf(lowestDiff);
  res.send(friends[friendIndex]);
  // console.log(friends[friendIndex].name);
  // console.log(lowestDiff);
  // console.log(diffArr);
  // res.json(req.body);
});

// Routing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app/public/home.html'));
});

app.get('/survey', function(req, res) {
  res.sendFile(path.join(__dirname, 'app/public/survey.html'));
});

// Listening to server
app.listen(PORT, function() {
  console.log('Listening to port: ' + PORT);
  console.log(friends);
});
