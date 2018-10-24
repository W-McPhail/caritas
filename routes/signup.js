var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    var firstname = req.body.firstname;
    res.render('index', {title: firstname});
});

module.exports = router;
