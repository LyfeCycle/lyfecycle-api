var mongo = require('mongodb');
var locations = require('./routes/locations');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var mongoPort = 27017;
var mongoURI = (process.env.MONGOLAB_URI || 'localhost');

var server = new Server(mongoURI, mongoPort, {auto_reconnect: true});
db = new mongo.Db('locationdb', server, {safe: true});
 
db.open(function(err, db) {
	console.log('Opening db at url: ' + mongoURI);
    if(!err) {
        console.log("Connected to 'locationdb' database");
        db.collection('locations', {safe:true}, function(err2, collection) {
            if (err2) {
                console.log("The 'locations' collection doesn't exist. Creating it with sample data...");
                try {
                    console.log('trying to populate DB');
                    locations.populateDB();
                }
                catch(err) {
                    console.log(err);
                }
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