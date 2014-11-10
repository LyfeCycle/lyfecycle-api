var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var mongoPort = 27017;

var server = new Server('127.0.0.1', mongoPort, {auto_reconnect: true});
db = new Db('locationdb', server);
 
db.open(function(err, db) {
	console.log('Opening db');
    if(!err) {
        console.log("Connected to 'locationdb' database");
        db.collection('locations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'locations' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else if (err) {
    	console.log(err);
    	console.log('Is there a MongoDB server running?');
    }
});


exports.db = function() {
	return db;
}