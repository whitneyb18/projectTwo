var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/last-search/:id", function(req, res) {
    db.Last_Search.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  // Create a new example
  app.post("/api/last-search", function(req, res) {
    db.Last_Search.create(req.body).then(function(dbRes) {
      res.json(dbRes);
    });
  });
};
