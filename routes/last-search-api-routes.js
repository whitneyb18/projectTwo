var db = require("../models");

module.exports = function(app) {
  // Get last search for a specific user
  app.get("/api/last-search/:id", function(req, res) {
    db.Users.findAll({
      include: [
        {
          model: db.Restaurants,
          as: "user_restaurant"
        }
      ],
      where: {
        id: req.session.user.id
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

// Create a new last-search
  // app.post("/api/last-search", function(req, res) {
  //   db.Last_Search.create(req.body).then(function(dbRes) {
  //     res.json(dbRes);
  //   });
  // });

   //delete a favorite for a user - NOT WORKING YET NEED TEST DATA
   app.delete("/api/last-search", function(req, res) {
    db.Last_Search.destroy({
      where: {
        user_id: req.session.user.id
      }
    }).then(function() {
      res.send(202);
    });
  });

 
};
