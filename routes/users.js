var express = require('express');
var router = express.Router();

var database = require("../database/database");

router.get('/', function (req, res, next) {
    var s = database.getAllPeople();

    console.log("s -> " + s);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length':0,
        'Expires': new Date().toUTCString()
    });
    s.forEach(value => {
            console.log(value.identifier);
            res.write(value.identifier);
            res.write("\n<br>");
        }
    );
    res.end();
    // console.log(s);
    // console.log("s");
    // res.write(s);
});
/* GET users listing. */


module.exports = router;
