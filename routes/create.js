var express = require('express');
var router = express.Router();

var database = require(".././database/database");
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('create');
});

router.post('/', async function (req, res, next) {
    let identifier = req.body['identifier'];
    let extra_info = req.body['extra_info'];
    database.addToDb({identifier: identifier, extra: extra_info});

    const mealsState = database.getMealsState();

    const db_max_meals_stay = mealsState['max_meals_stay'];
    const db_max_meals_go = mealsState['max_meals_stay'];


    res.render('member', {
        title: "Member Login",
        max_meals_stay: db_max_meals_stay,
        max_meals_go: db_max_meals_go,
        meals_stay_prev: 0,
        meals_go_prev: 0,
        extra_info: extra_info
    });
});
module.exports = router;
