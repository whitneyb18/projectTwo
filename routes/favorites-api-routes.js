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
