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
        id: req.params.id
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

// Create a new last-search
  app.post("/api/last-search", function(req, res) {
    db.Last_Search.create(req.body).then(function(dbRes) {
      res.json(dbRes);
    });
  });

  // PUT route for updating searches
  app.put("/api/last-search/:id/:column/:value", function(req, res) {
    var userID = req.param.id;
    var column = req.param.column;
    var value = req.param.value;

    db.Last_Search.findOne({
      where: {
        UserId: userID
      }
    }).then(function(user) {
      user.set(column,value).save().then(function(dbRes) {
        res.json(dbRes)
      }) 
    })
  });

   //delete a favorite for a user - NOT WORKING YET NEED TEST DATA
   app.delete("/api/last-search/:id", function(req, res) {
    db.Last-Search.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRes) {
      res.json(dbRes);
    });
  });


 
};
