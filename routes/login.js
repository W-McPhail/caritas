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
            res.render("home", {error: "ID '" + memberId + "' not found!"});
            return
        }
        const mealsState = database.getMealsState();

        const db_max_meals_stay = mealsState['max_meals_stay'];
        const db_max_meals_go = mealsState['max_meals_stay'];


        let lastMealsStay = profile['lastMealsStay'];
        if (typeof lastMealsStay === 'undefined')
            lastMealsStay = 0;
        let lastMealsGo = profile['lastMealsGo'];
        if (typeof lastMealsGo === 'undefined')
            lastMealsGo = 0;

        let tooManyStayLast = false;
        if (lastMealsStay > db_max_meals_stay) {
            tooManyStayLast = true;
            lastMealsStay = db_max_meals_stay;
        }


        let tooManyGoLast = false;
        if (lastMealsGo > db_max_meals_go) {
            tooManyGoLast = true;
            lastMealsGo = db_max_meals_go;
        }

        res.render('member', {
            title: "Member Login",
            max_meals_stay: db_max_meals_stay,
            max_meals_go: db_max_meals_go,
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