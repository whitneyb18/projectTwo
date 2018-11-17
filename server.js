require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require('express-session');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

//cookie middleware
app.use(session({
  secret: process.env.SESSIONSECRET || "keybordcat",
  resave: false,
  saveUninitialized: true
}));

//middleware for setting up a user object when anyone first come to the appplication
function userSetup(req, res, next) {
  if (!req.session.user) {
    req.session.user = {}
    req.session.user.loggedIn = false;
  }
  next()
}

//using middlewhere acrossed the entire application before any route gets hit.
app.use(userSetup)

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/favorites-api-routes")(app);
require("./routes/index-api-routes")(app);
require("./routes/last-search-api-routes")(app);
require("./routes/restaurants-api-routes")(app);
require("./routes/users-api-routes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;