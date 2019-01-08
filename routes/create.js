var express = require('express');
var router = express.Router();

var database = require(".././database/database");
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('create');
});

router.post('', async function (req, res, next) {
    let identifier = req.body['identifier'];
    let extra_info = req.body['extra_info'];
    database.addToDb({identifier: identifier, extra: extra_info});
});
module.exports = router;
