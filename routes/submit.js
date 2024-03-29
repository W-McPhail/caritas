var express = require('express');
var router = express.Router();

let database = require("../backend/database");
let language = require("../backend/language");

/* GET home page. */
router.post('/', async function (req, res, next) {
    let guest = req.body['type'] === "guest";
    let meals_stay = req.body['meals_now_stay'];
    let meals_go = req.body['meals_now _go'];
    let memberID = req.body['memberId'];

    console.log("processing: isGuest: " + guest + " meals_stay: " + meals_stay + " meals_go: " + meals_go + " memberID: " + memberID);
    const mealsState = await database.getMealsState();

    const db_max_meals_stay = mealsState['max_meals_stay'];
    const db_max_meals_go = mealsState['max_meals_stay'];

    if (meals_go > db_max_meals_go || meals_stay > db_max_meals_stay) {
        res.render("home", {error: "Meals provided is higher than allowed!"});
        return;
    }


    if (meals_stay !== 0)
        database.insertMeals(meals_stay, guest ? -1 : memberID, false);
    if (meals_go !== 0)
        database.insertMeals(meals_go, guest ? -1 : memberID, true);
    let name = guest ? "Guest" : "An error occurred while loading your information";
    if (!guest) {
        let person = await database.getPerson(memberID);
        person['lastMealsStay'] = meals_stay;
        person['lastMealsGo'] = meals_go;
        name = memberID;
        database.updatePerson(memberID, person);
    }
    res.render("confirm", {person_name: name, meals_stay: meals_stay, meals_go: meals_go,
        translation: language.getTranslationFile(),
        index: language.getLanguageIndex(req)
    });
});

module.exports = router;
