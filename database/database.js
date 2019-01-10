var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
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
module.exports = {addToDb, getAllPeople, getPerson, getMealsState, setMealsState, insertMeals, updatePerson};


/*
    Adds a document to the clients collection in form

    identifier = name
 */
function addToDb(doc) {
    var myobj = doc;
    var clientCollection = database.collection("clients");
    clientCollection.insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Created new user: " + myobj['identifier'] + doc);
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


/**
 * Gets a person by ID
 * @param id of member
 * @returns member profile if exists
 */
async function getPerson(id) {
    let coll = database.collection('clients');
    try {
        return await coll.findOne({identifier: id});
    } catch (e) {
        return null;
    }
}

/**
 * Returns all clients
 * @param cb
 */
function getAllPeople(cb) {
    database.collection("clients").find().toArray(cb);
}

/**
 * Set current meal state to provided params
 * @param state
 */
function setMealsState(state) {
    let coll = database.collection('state');
    try {
        coll.drop();
        coll.insert(state);
    } catch (e) {
        console.log(e);
    }

}

/**
 * Inserts meal track into DB. If both togo and stay are selected, then you need to use two database inserts
 * @param amount amount of meals being taken
 * @param memberId ID of member, use -1 for guest
 * @param togo Whether it is togo
 */
function insertMeals(amount, memberId, togo) {

    item = {
        amount: amount,
        memberId: memberId,
        togo: togo,
        time: new Date().getMilliseconds()
    };

    database.collection("meals").insert(item);
}

/**
 * @returns current meals state
 */
async function getMealsState() {
    let coll = database.collection('state');
    try {
        return await coll.findOne();

    } catch (e) {
        return null;
    }
}

/**
 * Updates member profile
 * @param id ID of person
 * @param person profile data
 */
function updatePerson(id, person) {
    let coll = database.collection('clients');
    coll.update({identifier: id}, person, {upsert: true, safe: false});

}




