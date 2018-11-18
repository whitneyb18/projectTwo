var db = require("../models");

module.exports = function(app) {
  //select all favorites for a user
  app.get("/api/favorites/:id", function(req, res) {
    db.Users.findAll({
      include: [
        {
          model: db.Restaurants,
          as: "user_favorite"
        }
      ],
      where: {
        id: req.params.id
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  //select all favorites for a user by type
  app.get("/api/favorites/:id/:type", function(req, res) {
    db.Users.findAll({
      include: [
        {
          model: db.Restaurants,
          as: "user_favorite",
          where: {
            restaurant_type: req.params.type
          }
        }
      ],
      where: {
        id: req.params.id
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  // //add new favorite
  // app.post("api/favorites/:name", function(req, res) {
  //   db.Restaurants.findOne({
  //     where: {
  //       restaurant_name: req.params.name
  //     }
  //   }).then(function(dbRes) {
  //     db.Favorite.create({
  //       user_id: req.session.user.id,
  //       UserId: req.session.user.id,
  //       restaurant_id: dbRes[0].dataValues.id,
  //       RestaurantId: dbRes[0].dataValues.id
  //     })
  //   })
  // })

  //delete a favorite for a user - NOT WORKING YET NEED TEST DATA
  app.delete("/api/favorites/:id", function(req, res) {
    db.Favorites.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });
};
