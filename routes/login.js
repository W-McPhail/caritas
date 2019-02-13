var express = require('express');
var router = express.Router();

let database = require("../backend/database");
let language = require("../backend/language");

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
        const mealsState = await database.getMealsState();

        const db_max_meals_stay = mealsState['max_meals_stay'];
        const db_max_meals_go = mealsState['max_meals_go'];


        let lastMealsStay = profile['lastMealsStay'];
        let extra_info = profile['extra'];
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

        console.log(extra_info);
        let tooManyGoLast = false;
        if (lastMealsGo > db_max_meals_go) {
            tooManyGoLast = true;
            lastMealsGo = db_max_meals_go;
        }

        let options = {
            title: "Member Login",
            max_meals_stay: db_max_meals_stay,
            max_meals_go: db_max_meals_go,
            meals_stay_prev: lastMealsStay,
            meals_go_prev: lastMealsGo,
            extra_info: extra_info,
            memberId: memberId,
            translation: language.getTranslationFile(),
            index: language.getLanguageIndex(req)
        };
        console.log(options);
        res.render('member', options);
    }
    else if (type === ("guest")) {
        res.render('guest',
            {
                title: "Guest Login",
                max_meals_stay: 3,
                max_meals_go: 4,
                translation: language.getTranslationFile(),
                index: language.getLanguageIndex(req)
            });

    } else {
        res.write("we don't know what you tried to do! Sent type is '" + type + "'. Expected: member,guest");
        res.end();
    }
})
;

module.exports = router;