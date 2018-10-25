

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let db = null;
console.log("Starting db");
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    this.db = db.db("caritas");

});


var add = function addToDb(firstname) {
    var myobj = {identifier: firstname};
    console.log("Entering");
    db.collection("clients").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
};


