var express = require('express');
var router = express.Router();

var database = require("../database/database");

router.get('/', function (req, res, next) {
     database.getAllPeople(function (err, data) {
        if (err) {
            console.log(err);
            return res(err);
        } else {
            console.log(data);
            return res.json(data);
        }
    });
});
/* GET users listing. */


module.exports = router;
