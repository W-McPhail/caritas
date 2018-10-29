var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
console.log("Starting db");
var dat;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dat = db.db("caritas");
    console.log("NOT NULL!")

});
console.log(typeof db);
module.exports = {addToDb, getAllPeople};


function addToDb(firstname) {
    var myobj = {identifier: firstname};
    var collection = dat.collection("clients");
    collection.insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Created new user: " + firstname);
    });
}

function getAllPeople() {
    var collection = dat.collection("clients");
    var array = [];

    var find = collection.find();
    find.forEach(function(doc) {
        console.log("-> " + doc);
        array.push(doc);
    }, function(err) {
        // done or error
    });
    console.log(array);
    return array;
}


