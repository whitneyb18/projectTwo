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
        id: req.session.user.id
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  //select all favorites for a user by type
  app.get("/api/favorites/:type/:id", function(req, res) {
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
        id: req.session.user.id
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  //add new favorite
  app.post("/api/restaurants/:id", function(req, res) {
    db.Restaurants.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbRes) {
      db.Favorites.create({
          user_id: req.session.user.id,
          UserId: req.session.user.id,
          restaurant_id: dbRes[0].dataValues.id,
          RestaurantId: dbRes[0].dataValues.id
        })

      console.log(req.session.user.id);
      console.log(dbRes[0].dataValues.id);
    });
  });

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
