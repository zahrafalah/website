const router = require("express").Router();

//api-routes.js - this file offers a set of routes for displaying and saving data to db

//Dependencies

const db = require('../models');

//Products table api-routs
// =============================================================
// GET route for getting all of the products
router.get('/api/Products/:id?', function (req, res) {
    // findAll returns all entries for a table when used with options (specifying the
    //id or not specifying any id)
    const where = {};
    if (req.params.id) {
        where.id = req.params.id;
    }

    db.Products.findAll({ where })
        .then(function (dbProducts) {
            // if (dbProducts.length < 1) {
            //     res.status(404).send('Nothing was found');
            //     return;
            // }
            // We have access to the users as an argument inside of the callback function
            res.json(dbProducts);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// POST route for saving a new products
router.post('/api/Products', function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    console.log(req.body);
    db.Products.create(req.body)
        .then(function (dbProducts) {
            // We have access to the new user as an argument inside of the callback function
            res.json(dbProducts);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// DELETE route for deleting products. We can get the id of the product to be deleted from
// req.params.id
router.delete('/api/Products/:id', function (req, res) {
    // We just have to specify which product we want to destroy with "where"
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (dbProducts) {
            res.json(dbProducts);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;
//note: Promises are either resolved or rejected. if its rejected it goes to catch(you
//can do whatever you want to do with it)
//and if its resolved it will go to .then().


