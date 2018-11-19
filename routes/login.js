var express = require('express');
var router = express.Router();

var test = require(".././database/database");


/* GET home page. */
router.post('/', function (req, res, next) {
    var type = req.body.type;
    if (type === ("member")) {
        var memberId = req.body.id;
    } else if (type === ("guest")) {
        res.render('member', {title:"Guest Login"});
    } else {
        res.write("we don't know what you tried to do! Sent type is '" + type + "'. Expected: member,guest");
        res.end();
    }
});

module.exports = router;
