var db = require("../models");

module.exports = function(app) {
  // add a new restaurant
  app.post("/api/restaurants", function(req, res) {
    console.log(req.session)
    res.send(200);
    db.Restaurants.findAll({
      where: {
        restaurant_place_id: req.body.placeId
      }
    }).then(function(dbRes) {
      console.log(dbRes)
      if (dbRes.length) {
          db.Last_Search.create({
            user_id: req.session.user.id,
            restaurant_id: dbRes[0].dataValues.id
          })
        }
      else {
        db.Restaurants.create({
          restaurant_name: req.body.name,
          restaurant_type: req.body.type,
          restaurant_address: req.body.address,
          restaurant_place_id: req.body.placeId
        }).then(function(dbRes) {
          console.log("WHAT THE EFF " + dbRes.dataValues.id);
          console.log(dbRes.dataValues.id)
          db.Last_Search.create({
            user_id: req.session.user.id,
            restaurant_id: dbRes.dataValues.id
          })
        });
      }
    })
  });
  };
