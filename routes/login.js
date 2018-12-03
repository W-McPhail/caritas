var express = require('express');
var router = express.Router();

//var test = require(".././database/database");
var database = require("../database/database");

router.post('/', async function (req, res, next) {
    const type = req.body.type;
    if (type === ("member")) {
        const memberId = req.body.id;

        console.log("Finding: " + memberId);
        const profile = await database.getPerson(memberId); //Get profile from database
        if (profile == null) {
            res.render("home", {error: "ID '" + memberId + "' not found! 1"});//TODO change
            return
        }
        console.log(profile);


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
    }
    else if (type === ("guest")) {
        res.render('guest', {title: "Guest Login", max_meals_stay: 3, max_meals_go: 4});
    } else {
        res.write("we don't know what you tried to do! Sent type is '" + type + "'. Expected: member,guest");
        res.end();
    }
})
;

module.exports = router;