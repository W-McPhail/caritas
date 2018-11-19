var express = require('express');
var router = express.Router();

var database = require("../database/database");

router.get('/', function (req, res, next) {
    //Gets all users and returns value in data
    database.getAllPeople(function (err, data) {
        if (err) {
            console.log(err);
            return res(err);
        } else {//U

            data.forEach(person => {
                res.write(person.identifier+"\n");
            });
            // console.log(data);
            res.end();
        }
    });
});
/* GET users listing. */

module.exports = router;
