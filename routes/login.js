var express = require('express');
var router = express.Router();

//var test = require(".././database/database");


router.post('/', function (req, res, next) {
    var type = req.body.type;
    if (type === ("member")) {
        var memberId = req.body.id;
        //TODO get profile from DB
        var profile = req.body;
        //TODO check whether they stayed or went last, fill in the opposite option as 0
        var lastMealsStay = profile['lastMealsStay'];
        if (typeof lastMealsStay === 'undefined')
            lastMealsStay = 0;
        var lastMealsGo = profile['lastMealsGo'];
        if (typeof  lastMealsGo === 'undefined')
            lastMealsGo = 0;
        res.render('member', {
            title: "Member Login",
            max_meals_stay: 3,
            max_meals_go: 4,
            max_meals_stay_prev: lastMealsStay,
            max_meals_go_prev: lastMealsGo
        });
    } else if (type === ("guest")) {
        res.render('guest', {title: "Guest Login", max_meals_stay: 3, max_meals_go: 4});
    } else {
        res.write("we don't know what you tried to do! Sent type is '" + type + "'. Expected: member,guest");
        res.end();
    }
});

module.exports = router;