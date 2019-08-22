const express = require("express");

const passport = require("passport");

const app = express();

//Authorization
//==============================================================
require("./passport.js")(passport);
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require("body-parser");

const Port = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
// app.use(express.static('public'));

// Routes
// =============================================================
const apiRoutes = require("./routes/index.js");
//connects all routes
app.use(apiRoutes);

SALT_WORK_FACTOR = 12;

//starter Pack. Hard-coded Data
// app.get('/api/users', (req, res) => {
//   const users = [
//     { id: 1, firstName: 'John', lastName: 'Doe' },
//     { id: 2, firstName: 'Steve', lastName: 'Mary' },
//     { id: 3, firstName: 'Mary', lastName: 'Swanson' }
//   ];
//   res.json(users);
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================

// Sequelize does not update automatically if you add columns to your tables,
// m to fix it Use db.sequelize.sync({force= true}).then(function ()... instead
// and remove it once you update it.o
db.sequelize.sync().then(function() {
  app.listen(Port, () => console.log(`Server started on port ${Port}`));
});
