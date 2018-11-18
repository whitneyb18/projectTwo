var db = require("../models");

module.exports = function(app) {
  // Get all restaurants
  // app.get("/api/restaurants", function(req, res) {
  //   db.Restaurants.findAll({}).then(function(dbRes) {
  //     res.json(dbRes);
  //   });
  // });

  // // Get all restaurants by type
  // app.get("/api/restaurants/:type", function(req, res) {
  //   db.Restaurants.findAll({
  //     where: {
  //       restaurant_type: req.params.type
  //     }
  //   }).then(function(dbRes) {
  //     res.json(dbRes);
  //   });
  // });

    //add new favorite
    app.post("api/favorites", function(req, res) {
      db.Restaurants.findOne({
        where: {
          id: req.body.id
        }
      }).then(function(dbRes) {
        // db.Favorite.create({
        //   user_id: req.session.user.id,
        //   UserId: req.session.user.id,
        //   restaurant_id: dbRes[0].dataValues.id,
        //   RestaurantId: dbRes[0].dataValues.id
        // })

        console.log(req.session.user.id)
        console.log(dbRes[0].dataValues.id)
      })
    })

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
          console.log(dbRes.dataValues.id);
          db.Last_Search.create({
            user_id: req.session.user.id,
            restaurant_id: dbRes[0].dataValues.id
          })
        });
      }
    })
  });
  };
