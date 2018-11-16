var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/last-search/:id", function(req, res) {
  //   db.Last_Search.findAll({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbRes) {
  //     res.json(dbRes);
  //   });
  // });

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

  // Get all searches where user said yes
  app.get("/api/last-search/:id", function(req, res) {
    db.Users.findAll({
      include: [
        {
          model: db.Last_Search,
          as: "last_search",
          where: {
            id: req.params.id,
            $or: [
              {
                food_type_0: {
                  $eq: true
                }
              },{
                food_type_1: {
                  $eq: true
                }
              },{
                food_type_2: {
                  $eq: true
                }
              },{
                food_type_3: {
                  $eq: true
                }
              },{
                food_type_4: {
                  $eq: true
                }
              },{
                food_type_5: {
                  $eq: true
                }
              },{
                food_type_6: {
                  $eq: true
                }
              },{
                food_type_7: {
                  $eq: true
                }
              },{
                food_type_8: {
                  $eq: true
                }
              },{
                food_type_9: {
                  $eq: true
                }
              }
            ]
          }
        }
      ],
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });




// Create a new example
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



  app.get("/api/last-search/:id/:column/:value", function(req, res) {
    var userID = req.param.id;
    var column = req.param.column;
    var value = req.param.value;

    db.Last_Search.findOne({
      where: {
        UserId: 1
      }
    }).then(function(user) {
      user.find(column,value).save().then(function(dbRes) {
        res.json(dbRes)
      }) 
    })
  });
};
