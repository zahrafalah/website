const passport = require("passport");

const router = require("express").Router();
const jwt = require("jsonwebtoken");

const passportjs = require("../passport");
//api-routes.js - this file offers a set of routes for displaying and saving data to db
const config = require("../config/config");
//Dependencies

const db = require("../models");
const bcrypt = require("bcryptjs");

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json("Success! You can not see this without a token");
  }
);

// Signin post restful-api for user authentication using async/await
// Tested with postman "Auth Successful"
router.post("/signup", async (req, res, next) => {
  //We are not using .then & .catch as we normally use in promises. So we have to use try catch instead.
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // console.log("req.body", req.body);
    const user = await db.User.create(req.body);
    // console.log(user);
    //sending back
    res.send(user);
  } catch (e) {
    //if any of the promises fail
    res.status(500).send(e);
  }

  // Signin post restful-api for user authentication using promises
  //router.post("/signup", (req, res, next) => {
  //   bcrypt.hash(req.body.password, 10, (err, hash) => {
  //     if (err) {
  //       return res.status(500).json({
  //         error: err
  //       });
  //     } else {
  //       // const user = new User({
  //       //     id:
  //       //     email:
  //       //     password:
  //       // })
  //       user
  //         .save()
  //         .then(result => {
  //           console.log(result);
  //           res.status(201).json({
  //             message: "User Created"
  //           });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //           res.status(500).json({
  //             error: err
  //           });
  //         });
  //     }
  //   });
});

//Login post rest-api for user authentication using using async/await
//Tested with postman "Auth successful"
router.post("/api/user/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await db.User.findOne({
      where: {
        username: req.body.user.username
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );

    if (isMatch) {
      console.log(user.dataValues.username);
      //first arg is payload that we want to pass to client to jwt
      const token = jwt.sign(
        {
          username: user.dataValues.username,
          userId: user.dataValues.id
        },
        config.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      console.log(token);
      return res.status(200).json({
        username: user.dataValues.username,
        token: token
      });
    } else {
      return res.status(401).json({
        message: "Auth failed 0"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

//Login post  rest-api for user authentication using using promises
//Tested with postman "Auth successful"
// router.post("/api/user/login", (req, res, next) => {
//   db.User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       bcrypt.compare(
//         req.body.password,
//         user.dataValues.password,
//         (err, result) => {
//           if (err) {
//             return res.status(401).json({
//               message: "Auth failed 0"
//             });
//           }
//           if (result) {
//             return res.status(200).json({ username: user.dataValues.username });
//           }
//         }
//       );
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// GET route for getting all of the users
router.get("/api/user", function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.User.findAll({})
    .then(function(dbUsers) {
      // remove user passwords before sending to the front end.
      // look up how to remove a field with sequelize when searching for users
      // We have access to the users as an argument inside of the callback function
      res.send(dbUsers);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

// POST route for saving a new user
router.post("/api/user", function(req, res) {
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property
  console.log(req.body);
  db.User.create(req.body)
    .then(function(dbUsers) {
      // We have access to the new user as an argument inside of the callback function
      res.send(dbUsers);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

// DELETE route for deleting users. We can get the id of the user to be deleted from
// req.params.id
router.delete("/api/user/:id", function(req, res) {
  // We just have to specify which users we want to destroy with "where"
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function(dbUsers) {
      res.json(dbUsers);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// PUT route for updating users. We can get the updated users data from req.body
router.put("/api/user/:id", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(function(dbUsers) {
      res.json(dbUsers);
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
