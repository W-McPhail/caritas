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

function getAllPeople(cb) {
    var collection = dat.collection("clients");
    return collection.find().toArray(cb);
}


