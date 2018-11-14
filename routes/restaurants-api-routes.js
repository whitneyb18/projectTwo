var db = require("../models");

module.exports = function(app) {
  // Get all restaurants
  app.get("/api/restaurants", function(req, res) {
    db.Restaurants.findAll({}).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  // Get all restaurants by type
  app.get("/api/restaurants/:type", function(req, res) {
    db.Restaurants.findAll({
      where: {
        restaurant_type: req.params.type
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  // add a new restaurant
  app.post("/api/restaurants", function(req, res) {
    db.Restaurants.create(req.body).then(function(dbRes) {
      res.json(dbRes);
    });
  });
};
