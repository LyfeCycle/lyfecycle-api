var database = require('../database')
var mongo = require('mongodb');

var BSON = mongo.BSONPure;
var db = database.db(); 

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving location: ' + id);
    db.collection('locations', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
        	res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('locations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addLocation = function(req, res) {
    var location = req.body;
    console.log('Adding location: ' + JSON.stringify(location));
    db.collection('locations', function(err, collection) {
        collection.insert(location, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateLocation = function(req, res) {
    var id = req.params.id;
    var location = req.body;
    console.log('Updating location: ' + id);
    console.log(JSON.stringify(location));
    db.collection('locations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, location, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating location: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(location);
            }
        });
    });
}
 
exports.deleteLocation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting location: ' + id);
    db.collection('locations', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id.createHexFromString)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.resetDB = function(req, res) {
	console.log('Repopulating database');
	populateDB();
	res.send('Database repopulated!');
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
    var locations = [
    {
        name: "Place 1",
        latitude: "42.349882",
        longitude: "-71.104498"
    },
    {
        name: "Place 2",
        latitude: "42.350516",
        longitude: "-71.112051"
    }];
 
    db.collection('locations', function(err, collection) {
    	collection.remove({}, function() {
    		collection.insert(locations, {safe:true}, function(err, result) {});
    	});
    });
 
};