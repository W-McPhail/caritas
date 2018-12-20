var express = require('express');
var router = express.Router();

var database = require(".././database/database");
/* GET home page. */
router.post('/', function (req, res, next) {
    let guest = req.body['type'] === "guest";
    let meals_stay = req.body['meals_now_stay'];
    let meals_go = req.body['meals_now _go'];
    let memberID = req.body['memberId'];

    console.log("processing: isGuest: " + guest + " meals_stay: " + meals_stay + " meals_go: " + meals_go + " memberID: " + memberID);
    const mealsState = database.getMealsState();

    const db_max_meals_stay = mealsState['max_meals_stay'];
    const db_max_meals_go = mealsState['max_meals_stay'];

    if (meals_go > db_max_meals_go || meals_stay > db_max_meals_stay) {
        res.render("home", {error: "Meals provided is higher than allowed!"});
        return;
    }
    if (meals_stay !== 0)
        database.insertMeals(meals_stay, guest ? -1 : memberID, false);
    if (meals_go !== 0)
        database.insertMeals(meals_go, guest ? -1 : memberID, false);

    if (!guest) {
        let person = database.getPerson(memberID);
        person['lastMealsStay'] = meals_stay;
        person["lastMealsGo"] = meals_go;
        database.updatePerson(memberID, person);
    }
    let name = guest ? "Guest" : memberID;
    res.render("confirm",{person_name: name, meals_stay: meals_stay, meals_go: meals_go});
    //TODO confirmation page
    render


});

module.exports = router;
