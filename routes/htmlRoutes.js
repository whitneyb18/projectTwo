var path = require("path");

// Routes
// =============================================================

//midleware function to check if a user is logged in
function checkLogin(req, res, next) {
  if(req.session.user.loggedIn){
    console.log("looks like you're logged in");
    next()
  }else{
    console.log("user wasnt logged in");
    res.redirect("/")
  }
}

module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // home route loads home.html
  app.get("/profile", checkLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  // swipe route loads swipe.html
  app.get("/swipe", checkLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/swipe.html"));
  });

  // results route loads results.html
  app.get("/results", checkLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  // favorites route loads favorites.html
  app.get("/favorites", checkLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });
};
