var mongo = require('mongodb');
var monk = require('monk');
var allgood = require('allgood'),
    valid = allgood.valid;

module.exports.init = function(context, callback) {
    module.context = context;
    console.log('Connecting to mongo at: ' + context.settings.mongoURI);
    db = monk(context.settings.mongoURI);
    locations = db.get('locations'); // locations is a collection
    if (!locations) {
        console.log('Locations database does not exist!');
    } else {
        console.log('Found the locations database');
    }
    callback(null);
}

module.exports.allLocations = function(req, res) {
    locations.find({}, function (err, docs){
        res.json(docs);
    });
}

module.exports.findLocation = function(req, res) {
    locations.find({_id : req.body.locationId}, function (err, docs){
        res.json(docs);
    });
}

module.exports.locationsByTag = function(req, res) {
    locations.find({tag : req.body.tag}, function (err, docs){
        res.json(docs);
    });
}

module.exports.reset = function(req, res) {
    locations.remove({});
    res.send('Reset locations!');
}

module.exports.addLocation = function(req, res) {
    json = req.body;
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

    locations.insert(newLocation, function(err, doc){
        console.log('Trying to add a location...');
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log('Success!');
            res.json('Success!');
        }
    });
  }
}

// define the keys we want all locations to have
var locationSchema = {
    "name":"string",
    "latitude":"string",
    "longitude":"string",
    "tag":"string"
};

var validLocationTags = ['busStop', 'crash', 'bikeRack', 'dangerPoint'];