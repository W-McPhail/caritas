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


/*
    Adds a document to the clients collection in form

    identifier = name
 */
function addToDb(firstname) {
    var myobj = {identifier: firstname};
    var collection = dat.collection("clients");
    collection.insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Created new user: " + firstname);
    });
}

/*
    Return all items in clients collection.
    MongoDB is async so the CB parameter is a callback function that is called with the result of query as an array of items
 */
function getAllPeople(cb) {
    dat.collection("clients").find().toArray(cb);
}


