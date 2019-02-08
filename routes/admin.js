var express = require('express');
var router = express.Router();

var database = require("../backend/database");

/* GET home page. */
router.get('/', async function (req, res, next) {
    let mealsState = await database.getMealsState();
    const db_max_meals_stay = mealsState['max_meals_stay'];
    const db_max_meals_go = mealsState['max_meals_stay'];


    console.log(mealsState);
    res.render('admin', {title: 'Caritas',
        meals_stay: db_max_meals_stay,
        meals_go: db_max_meals_go});
});

module.exports = router;
