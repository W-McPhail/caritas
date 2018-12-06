var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
console.log("Starting db");
var database;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    database = db.db("caritas");

    if (getMealsState() == null) {
        setMealsState({max_meals_stay: 4, max_meals_go: 3});
    }

});
console.log(typeof db);
module.exports = {addToDb, getAllPeople, getPerson, getMealsState, setMealsState};


/*
    Adds a document to the clients collection in form

    identifier = name
 */
function addToDb(firstname) {
    var myobj = {identifier: firstname};
    var clientCollection = database.collection("clients");
    clientCollection.insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Created new user: " + firstname);
    });
}

/*
function addMealsFromGuests(amount) {
    var obj = {time: -1 }; //change to uxix timestamp
    for (let i = 0; i < amount; i++) {
            //add to db
    }
}*/

/*
    Return all items in clients collection.
    MongoDB is async so the CB parameter is a callback function that is called with the result of query as an array of items
 */

/*
function getFirstUser() {
    return getUsers().then(function(users) {
        return users[0].name;
    }).catch(function(err) {
        return {
          name: 'default user'
        };
    });
}
 */
async function getPerson(id) {
    let coll = database.collection('clients');
    try {
        return await coll.findOne({identifier: id});
    } catch (e) {
        return null;
    }
}

function getAllPeople(cb) {
    database.collection("clients").find().toArray(cb);
}

function setMealsState(state) {
    let coll = database.collection('state');
    try {
        coll.drop();
        coll.insert(state);
    } catch (e) {
        console.log(e);
    }

}

async function getMealsState() {
    let coll = database.collection('state');
    try {
        return await coll.findOne();

    } catch (e) {
        return null;
    }
}




