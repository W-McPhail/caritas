var express = require('express');
var router = express.Router();
let language = require("../backend/language");

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('home', {
        title: 'Caritas',
        translation: language.getTranslationFile(),
        index: language.getLanguageIndex(req)
    });
});

module.exports = router;
