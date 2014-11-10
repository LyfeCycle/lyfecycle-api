var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var mongoPort = 27017;

var server = new Server('localhost', mongoPort, {auto_reconnect: true});
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
    	console.log("The 'locations' collection doesn't exist. Creating it with sample data...");
        populateDB();
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving location: ' + id);
    db.collection('locations', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id.createHexFromString)}, function(err, item) {
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
        collection.update({'_id':new BSON.ObjectID(id.createHexFromString)}, location, {safe:true}, function(err, result) {
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
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var locations = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('locations', function(err, collection) {
        collection.insert(locations, {safe:true}, function(err, result) {});
    });
 
};