// Packages
const express = require('express');
// Express & PORT
const app = express();
const PORT = 3000;
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Listening to server
app.listen(PORT, function() {
  console.log('Listening to port: ' + PORT);
});
