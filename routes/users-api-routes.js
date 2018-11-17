var db = require("../models");
var bcrypt = require('bcrypt');

module.exports = function (app) {
  // Get all examples
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).then(function (dbRes) {
      res.json(dbRes);
    });
  });

  // Create a new USER
  app.post("/api/users", function (req, res) {
    console.log(req.body)
    //to store a hased password into the database we need to first salt our password. this will tell bcrypt how many time to pass through the users password to generate the hash
    bcrypt.genSalt(10, function (err, salt) {
      //the bcrypt hash method will then 
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.
        req.body.password = hash;
        db.Users.create(req.body).then(function (dbData) {
          var userObj = {
            id: dbData.dataValues.id,
            first_name: dbData.dataValues.first_name,
            last_name: dbData.dataValues.last_name,
            email: dbData.dataValues.email
          };
          req.session.user = userObj;
          req.session.user.loggedIn = true;

          res.json(req.session.user);
        });
      });
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function (req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbRes) {
      res.json(dbRes);
    });
  });

  //logout routes
  app.get('/api/logout', function (req, res) {
    req.session.user = {}
    req.session.user.loggedIn = false;
    res.send('youve logged out')
  })

  //login endpoint
  app.post("/api/login", function (req, res) {
    //will show our user data from front end
    console.log(req.body)
    //will see the currently formatted session object with user data
    console.log(req.session)
    //initalizing user data variable to an empty object. this will hold our user data on this endpoint
    var user = {};
    //using our users model to query our MySQL database for user info where ther username equals the username we passed in from the front end
    db.Users.findOne({
        where: {
          email: req.body.email,

        }
      })
      .then(function (dbData) {
        //if the database does not find a user with that username we will revice a null value from our database. null values are a little "special" in relation to JS.
        //this is how we would correctly do a check for a null value if recieved
        if (!dbData && typeof dbData === "object") {
          //this will send an error code to our front end for the user not existing
          res.status(200).send('ohhh no, there is a problem with the username or password!')
        } else {
          //here we bring in bcrypt. bcrypt's compair method asks for a few things. it asks for the first parameter you send in a plain text password. 
          //AKA: our users password coming in from the front end. the second parameter bcrypt wants us to pass in the hashed password that we stored in the db. lastly it wants a callback funtion
          //bcrypt will hash the pasword coming in from the front end and compaire it to the users hashed password from our database it will give us a boolean value to let us know if the 
          //passwords were the same
          bcrypt.compare(req.body.password, dbData.dataValues.password, function (err, bcryptRes) {
            // bcryptRes == true or false

            //if the response is false send an error to the front end letting the user know that the passwords did not match.
            if (!bcryptRes) {
              res.status(404).send('ohhh no, there is a problem with the username or password!')
            } else {
              //if the response from bcrypt was true we know our users password matched and we can now format the user data coming from the database to be sent to the font end
              var userObj = {
                id: dbData.dataValues.id,
                first_name: dbData.dataValues.first_name,
                last_name: dbData.dataValues.last_name,
                email: dbData.dataValues.email
              };
              //here the session's user object is updated with the users data. we can hit our /session endpoing witha  get request from the front end and get our user object.
              req.session.user = userObj;
              //we update the loggedIn key to have a true value. we can use this value on the fron end to see if the user is logged in or not.
              req.session.user.loggedIn = true;

              console.log(dbData.dataValues)
              res.status(200).send('Successful login')
            }
          });
        }
      });
  })

  //get user info endpoint via query params
  app.get('/api/profile/:email', function (req, res, next) {
    console.log(req.param);
    db.users.findOne({
      where: {
        email: req.params.email
      }
    }).then(function (dbData) {
      console.log(dbData)
      var userObj = {
        id: dbData.dataValues.id,
        first_name: dbData.dataValues.first_name,
        last_name: dbData.dataValues.last_name,
        email: dbData.dataValues.email
      }
      req.session.user.loggedIn = true;
      req.session.user = userObj;
      res.json(userObj)
    })
  });

  //update profile route
  app.put('/api/update/:email', function (req, res, next) {
    var loggedUser = req.session.user.loggedIn;
    req.session.user = req.body
    if (loggedUser) {
      db.users.update({
        id: dbData.dataValues.id,
        first_name: dbData.dataValues.first_name,
        last_name: dbData.dataValues.last_name,
        email: dbData.dataValues.email
      }, {
        where: {
          email: req.params.email
        }
      }).then(function (dbData) {
        res.json(dbData.dataValues)
      })
    } else {
      res.status(404).json("please log in to update profile")
    }
  });

  //endpoint for grabbing session user object to be used accrossed entire app.
  app.get("/api/session", function (req, res, next) {
    console.log(req.session.user.id)
  });
};