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
    res.send(200);
    db.Restaurants.findAll({
      where: {
        restaurant_place_id: req.body.placeId
      }
    }).then(function(dbRes) {
      if (dbRes.length) {
          res.status(400).send();
        }
      else {
        db.Restaurants.create({
          restaurant_name: req.body.name,
          restaurant_type: req.body.type,
          restaurant_address: req.body.address,
          restaurant_place_id: req.body.placeId
        }).then(function(dbRes) {
          console.log(dbRes);
        });
      }
    })

    // db.Last_Search.create({
    //   user_id: req.body.user_id,
    //   restaurant_id: req.body.restaurant_id
    // })
  });
  };
