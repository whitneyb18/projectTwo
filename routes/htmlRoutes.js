var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // home route loads home.html
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // swipe route loads swipe.html
  app.get("/swipe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/swipe.html"));
  });

  // results route loads results.html
  app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  // favorites route loads favorites.html
  app.get("/favorites", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });

};
