var express = require('express');
var router = express.Router();

var test = require(".././database/database");


/* GET home page. */
router.post('/', function (req, res, next) {
    console.log("Yeet");
    var firstname = req.body.firstname;
    test.addToDb(firstname);
    res.render('index', {title: firstname});
});

module.exports = router;
