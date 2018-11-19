var express = require('express');
var router = express.Router();

var test = require(".././database/database");


/* GET home page. */
router.post('/', function (req, res, next) {
    var type = req.body.type;
    if (type === ("member")) {
        var memberId = req.body.id;
        res.render('member', {title: "Member Login"});
        console.log("potato");
    } else if (type === ("guest")) {
        res.render('guest', {title:"Guest Login",max_meals_stay:3, max_meals_go: 4});
    } else {
        res.write("we don't know what you tried to do! Sent type is '" + type + "'. Expected: member,guest");
        res.end();
    }
});

module.exports = router;
