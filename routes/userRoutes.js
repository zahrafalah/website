const router = require("express").Router();
//api-routes.js - this file offers a set of routes for displaying and saving data to db

//Dependencies

const db = require('../models');
const bcrypt = require('bcrypt');

//Signin post restful-api for user authentication using Json web token
// router.post('/signup',(req, res, next)=>{
//     const user = new User({
        
//     })
// })


//Login post  rest-api for user authentication using Json web token
router.post("/api/user/login",(req, res, next)=>{
    db.User.findOne({username: req.body.username})
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        console.log("User: ", user);
        console.log("User PassWord: ",req.body.password);
        // let pass= req.body.password;
        //password is not defined
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (resault){
                return res.status(200).json({
                    message: 'Auth successful'
                })
            }
            res.status(401).json({
                message:'Auth failed'
            })

        })
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
            
        });
    });
});

// GET route for getting all of the users
router.get('/api/user', function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({})
        .then(function (dbUsers) {
            console.log('dbUsers', dbUsers);
            // We have access to the users as an argument inside of the callback function
            res.send(dbUsers);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// POST route for saving a new user
router.post('/api/user', function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    console.log(req.body);
    db.User.create(req.body)
        .then(function (dbUsers) {
            // We have access to the new user as an argument inside of the callback function
            res.send(dbUsers);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// DELETE route for deleting users. We can get the id of the user to be deleted from
// req.params.id
router.delete('/api/user/:id', function (req, res) {
    // We just have to specify which users we want to destroy with "where"
    db.User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (dbUsers) {
            res.json(dbUsers);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// PUT route for updating users. We can get the updated users data from req.body
router.put('/api/user/:id', function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(function (dbUsers) {
            res.json(dbUsers);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;
