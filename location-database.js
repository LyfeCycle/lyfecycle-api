var mongo = require('mongodb');
var monk = require('monk');
var allgood = require('allgood'),
    valid = allgood.valid;

module.exports.init = function(context, callback) {
    module.context = context;
    console.log('Connecting to mongo at: ' + context.settings.mongoURI);
    db = monk(context.settings.mongoURI);
    module.context.locations = db.get('locations'); // locations is a collection
    if (!module.context.locations) {
        console.log('Locations database does not exist!');
    } else {
        console.log('Found the locations database');
    }
    callback(null);
}

module.exports.allLocations = function(req, res) {
    module.context.locations.find({}, function (err, docs){
        res.json(docs);
    });
}

module.exports.locationsWithin = function(req, res) {
    if ("topLeftLat" in req.query) {
        json = req.query;
    } else if ("topLeftLat" in req.body) {
        json = req.body;
    } else {
        res.json('could not find parameters');
    }
    module.context.locations.find({
        'latitude':{$gte: json.topLeftLat, $lte: json.botRightLat},
        'longitude':{$gte: json.topLeftLong , $lte: json.botRightLong}
    }, function (err, docs){
        res.json(docs);
    });
}

module.exports.findLocation = function(req, res) {
    module.context.locations.find({_id : req.body.locationId}, function (err, docs){
        res.json(docs);
    });
}

module.exports.locationsByTag = function(req, res) {
    module.context.locations.find({tag : req.body.tag}, function (err, docs){
        res.json(docs);
    });
}

module.exports.reset = function(req, res) {
    module.context.locations.remove({});
    res.send('Reset locations!');
}

module.exports.addLocation = function(req, res) {
  jsonArray = req.body;
 
  jsonArray.forEach(function(json) {
	if (!valid(locationSchema, json)) {
		console.log('Invalid location!');
		res.json(allgood.problems(locationSchema, json));
	} else {
		// check that the tag is valid
		if (!(validLocationTags.indexOf(json.tag) >= 0)) {
			res.json(json.tag + " is not a valid tag, must be one of " + validLocationTags); 
			return;
		}

		newLocation = {
			"name":json.name,
			"latitude":json.latitude,
			"longitude":json.longitude,
			"tag":json.tag
		};

		module.context.locations.insert(newLocation, function(err, doc){
			console.log('Trying to add a location...');
			if(err) {
				console.log(err);
				res.json(err);
			} else {
				console.log('Success!');
			}
		});
	}
  });
  res.json('Success!');
}

module.exports.getDirections = function(req, res) {
    if ("startLat" in req.query) {
        json = req.query;
    } else if ("startLat" in req.body) {
        json = req.body;
    } else {
        res.json('could not find parameters');
    }
    directions = module.context.directionsHelper.getDirections(json.startLat, json.startLong, json.destination, function(directions) {
        res.json(directions.routes);
    });
}

// define the keys we want all locations to have
var locationSchema = {
    "name":"string",
    "latitude":"float",
    "longitude":"float",
    "tag":"string"
};

var validLocationTags = ['busStop', 'crash', 'bikeRack', 'dangerPoint', 'dooring', 'traffic', 'trafficAccident', 'construction', 'blockedBikeLane'];
